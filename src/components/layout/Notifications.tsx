import { useEffect, useState, useRef } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/AuthContext"
import { formatDistanceToNow } from "date-fns"

interface Notification {
    id: string
    title: string
    message: string
    is_read: boolean
    type: 'info' | 'success' | 'warning' | 'error'
    created_at: string
}

export function Notifications() {
    const { user } = useAuth()
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (user) {
            fetchNotifications()
            subscribeToNotifications()
        }
    }, [user])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const fetchNotifications = async () => {
        if (!user) return

        const { data } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(10)

        if (data) {
            setNotifications(data)
            setUnreadCount(data.filter(n => !n.is_read).length)
        }
    }

    const subscribeToNotifications = () => {
        const subscription = supabase
            .channel('notifications')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user?.id}` }, (payload) => {
                setNotifications(current => [payload.new as Notification, ...current])
                setUnreadCount(count => count + 1)
            })
            .subscribe()

        return () => {
            subscription.unsubscribe()
        }
    }

    const markAsRead = async () => {
        if (!user || unreadCount === 0) return

        const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('user_id', user.id)
            .eq('is_read', false)

        if (!error) {
            setUnreadCount(0)
            setNotifications(current => current.map(n => ({ ...n, is_read: true })))
        }
    }

    const toggleOpen = () => {
        if (!isOpen) {
            markAsRead()
        }
        setIsOpen(!isOpen)
    }

    if (!user) return null

    return (
        <div className="relative mr-4" ref={dropdownRef}>
            <Button variant="ghost" size="icon" onClick={toggleOpen} className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </Button>

            {isOpen && (
                <div className="absolute right-0 top-12 z-50 w-80 rounded-md border bg-popover shadow-md outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
                    <Card className="border-0 shadow-none">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-1 p-4 pt-0 max-h-[300px] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <p className="text-sm text-muted-foreground text-center py-4">
                                    No notifications
                                </p>
                            ) : (
                                notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
                                    >
                                        <span className={`flex h-2 w-2 translate-y-1.5 rounded-full ${notification.type === 'error' ? 'bg-red-500' : notification.type === 'success' ? 'bg-green-500' : 'bg-sky-500'}`} />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {notification.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}

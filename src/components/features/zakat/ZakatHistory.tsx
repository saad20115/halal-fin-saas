import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"

interface ZakatRecord {
    id: string
    zakat_year: number
    amount: number
    paid_amount: number
    status: 'pending' | 'paid' | 'partial'
    created_at: string
}

export function ZakatHistory() {
    const { t } = useTranslation()
    const { user } = useAuth()
    const [records, setRecords] = useState<ZakatRecord[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            fetchRecords()
        }
    }, [user])

    const fetchRecords = async () => {
        if (!user) return

        try {
            const { data, error } = await supabase
                .from('zakat_records')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (error) throw error
            setRecords(data || [])
        } catch (error) {
            console.error('Error fetching zakat records:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div className="text-center py-4">{t('common.loading') || 'Loading...'}</div>
    }

    if (records.length === 0) {
        return (
            <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                    {t('zakat.history.no_records') || 'No zakat records found.'}
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('zakat.history.title')}</CardTitle>
                <CardDescription>{t('zakat.history.header')}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {records.map((record) => (
                        <div key={record.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                            <div>
                                <div className="font-medium">Zakat {record.zakat_year}</div>
                                <div className="text-sm text-muted-foreground">
                                    {format(new Date(record.created_at), 'PPP')}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold">{record.amount.toLocaleString()} SAR</div>
                                <Badge variant={record.status === 'paid' ? 'default' : 'secondary'}>
                                    {record.status}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

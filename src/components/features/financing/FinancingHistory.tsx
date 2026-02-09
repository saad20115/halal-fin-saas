import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"

interface FinancingRequest {
    id: string
    asset_value: number
    down_payment: number
    finance_amount: number
    duration_months: number
    monthly_payment: number | null
    status: 'pending' | 'approved' | 'rejected' | 'more_info_needed'
    created_at: string
}

export function FinancingHistory() {
    const { t } = useTranslation()
    const { user } = useAuth()
    const [requests, setRequests] = useState<FinancingRequest[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            fetchRequests()
        }
    }, [user])

    const fetchRequests = async () => {
        if (!user) return

        try {
            const { data, error } = await supabase
                .from('financing_requests')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (error) throw error

            setRequests(data || [])
        } catch (error) {
            console.error('Error fetching financing requests:', error)
        } finally {
            setLoading(false)
        }
    }

    const getStatusBadge = (status: string) => {
        const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
            pending: "secondary",
            approved: "default",
            rejected: "destructive",
            more_info_needed: "outline",
        }

        const labels: Record<string, string> = {
            pending: t('financing.status.pending') || 'Pending',
            approved: t('financing.status.approved') || 'Approved',
            rejected: t('financing.status.rejected') || 'Rejected',
            more_info_needed: t('financing.status.moreInfo') || 'More Info Needed',
        }

        return (
            <Badge variant={variants[status] || "default"}>
                {labels[status] || status}
            </Badge>
        )
    }

    if (!user) {
        return (
            <Card>
                <CardContent className="py-10 text-center">
                    <p className="text-muted-foreground">
                        {t('common.pleaseLogin') || 'Please login to view your requests'}
                    </p>
                </CardContent>
            </Card>
        )
    }

    if (loading) {
        return (
            <Card>
                <CardContent className="py-10 text-center">
                    <p className="text-muted-foreground">{t('common.loading') || 'Loading...'}</p>
                </CardContent>
            </Card>
        )
    }

    if (requests.length === 0) {
        return (
            <Card>
                <CardContent className="py-10 text-center">
                    <p className="text-muted-foreground">
                        {t('financing.noRequests') || 'You have no financing requests yet'}
                    </p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>{t('financing.myRequests') || 'My Financing Requests'}</CardTitle>
                    <CardDescription>
                        {t('financing.requestsDescription') || 'Track the status of your financing applications'}
                    </CardDescription>
                </CardHeader>
            </Card>

            {requests.map((request) => (
                <Card key={request.id}>
                    <CardContent className="pt-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        {format(new Date(request.created_at), 'PPP')}
                                    </span>
                                    {getStatusBadge(request.status)}
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">{t('financing.assetValue') || 'Asset Value'}</p>
                                        <p className="font-semibold">{request.asset_value.toLocaleString()} SAR</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">{t('financing.downPayment') || 'Down Payment'}</p>
                                        <p className="font-semibold">{request.down_payment.toLocaleString()} SAR</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">{t('financing.financingAmount') || 'Financing Amount'}</p>
                                        <p className="font-semibold">{request.finance_amount?.toLocaleString() || 'N/A'} SAR</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">{t('financing.duration') || 'Duration'}</p>
                                        <p className="font-semibold">{request.duration_months} {t('common.months') || 'months'}</p>
                                    </div>
                                </div>
                            </div>

                            {request.monthly_payment && (
                                <div className="rounded-lg bg-primary/10 p-4 text-center">
                                    <p className="text-xs text-muted-foreground">{t('financing.monthlyPayment') || 'Monthly Payment'}</p>
                                    <p className="text-2xl font-bold text-primary">
                                        {request.monthly_payment.toLocaleString()} SAR
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

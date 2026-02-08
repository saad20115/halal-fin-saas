import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, TrendingUp, DollarSign, AlertCircle } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function DashboardPage() {
    const { t } = useTranslation()

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h2>
            </div>

            <div className="space-y-4">
                {/* Quick Overview Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t('investments.portfolio.total_balance')}
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">SAR 45,231</div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% {t('investments.portfolio.from_last_month')}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t('investments.portfolio.total_profit')}
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">+SAR 2,350</div>
                            <p className="text-xs text-muted-foreground">
                                +12% {t('investments.portfolio.annual_return')}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t('investments.portfolio.zakat_due')}
                            </CardTitle>
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">SAR 1,131</div>
                            <p className="text-xs text-muted-foreground">
                                {t('investments.portfolio.calculated_on')}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t('financing.title')}
                            </CardTitle>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2</div>
                            <p className="text-xs text-muted-foreground">
                                Active Contracts
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('dashboard.quick_actions')}</CardTitle>
                        <CardDescription>
                            Navigate quickly to your most-used features
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Button variant="outline" className="h-20" asChild>
                            <a href="/financing">
                                <div className="flex flex-col items-center gap-2">
                                    <DollarSign className="h-5 w-5" />
                                    <span className="text-sm font-medium">{t('app.nav.financing')}</span>
                                </div>
                            </a>
                        </Button>
                        <Button variant="outline" className="h-20" asChild>
                            <a href="/invest">
                                <div className="flex flex-col items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    <span className="text-sm font-medium">{t('app.nav.invest')}</span>
                                </div>
                            </a>
                        </Button>
                        <Button variant="outline" className="h-20" asChild>
                            <a href="/zakat">
                                <div className="flex flex-col items-center gap-2">
                                    <ArrowUpRight className="h-5 w-5" />
                                    <span className="text-sm font-medium">{t('app.nav.zakat')}</span>
                                </div>
                            </a>
                        </Button>
                        <Button variant="outline" className="h-20" asChild>
                            <a href="/audit">
                                <div className="flex flex-col items-center gap-2">
                                    <AlertCircle className="h-5 w-5" />
                                    <span className="text-sm font-medium">{t('app.nav.audit')}</span>
                                </div>
                            </a>
                        </Button>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('dashboard.recent_activity')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 border-b pb-4">
                                <div className="rounded-full bg-primary/10 p-2">
                                    <TrendingUp className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">New Sukuk Investment</p>
                                    <p className="text-xs text-muted-foreground">Saudi Aramco - SAR 5,000</p>
                                </div>
                                <p className="text-xs text-muted-foreground">2 hours ago</p>
                            </div>
                            <div className="flex items-center gap-4 border-b pb-4">
                                <div className="rounded-full bg-green-500/10 p-2">
                                    <DollarSign className="h-4 w-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Zakat Payment Processed</p>
                                    <p className="text-xs text-muted-foreground">SAR 1,200 - Ramadan 1446</p>
                                </div>
                                <p className="text-xs text-muted-foreground">1 day ago</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="rounded-full bg-blue-500/10 p-2">
                                    <AlertCircle className="h-4 w-4 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Financing Application Approved</p>
                                    <p className="text-xs text-muted-foreground">Al Rajhi Bank - SAR 80,000</p>
                                </div>
                                <p className="text-xs text-muted-foreground">3 days ago</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

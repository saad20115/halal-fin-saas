import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, TrendingUp, DollarSign, PieChart } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/AuthContext"
import { Skeleton } from "@/components/ui/skeleton"

export function PortfolioSummary() {
    const { user } = useAuth()
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        totalBalance: 0,
        totalProfit: 0,
        investedAssetsCount: 0,
        zakatDue: 0
    })

    useEffect(() => {
        if (user) {
            fetchPortfolioStats()
        } else {
            setLoading(false)
        }
    }, [user])

    const fetchPortfolioStats = async () => {
        if (!user) return

        try {
            const { data, error } = await supabase
                .from('investment_portfolios')
                .select('total_value, total_profit, portfolio_type')
                .eq('user_id', user.id)

            if (error) throw error

            let balance = 0
            let profit = 0
            let count = 0

            if (data) {
                data.forEach(portfolio => {
                    balance += Number(portfolio.total_value) || 0
                    profit += Number(portfolio.total_profit) || 0
                    count++
                })
            }

            // Calculate Zakat (2.5% of total balance as an estimate)
            const zakat = balance * 0.025

            setStats({
                totalBalance: balance,
                totalProfit: profit,
                investedAssetsCount: count,
                zakatDue: zakat
            })
        } catch (error) {
            console.error('Error fetching portfolio stats:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-4 w-4 rounded-full" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-32 mb-2" />
                            <Skeleton className="h-3 w-24" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">SAR {stats.totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    <p className="text-xs text-muted-foreground">
                        +0% from last month
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className={`text-2xl font-bold ${stats.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stats.totalProfit >= 0 ? '+' : ''}SAR {stats.totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        All time profit
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Portfolios</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.investedAssetsCount}</div>
                    <p className="text-xs text-muted-foreground">
                        Sukuk, ETFs, Stocks
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Zakat Due (Est.)</CardTitle>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">SAR {stats.zakatDue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                    <p className="text-xs text-muted-foreground">
                        Calculated on 2.5%
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

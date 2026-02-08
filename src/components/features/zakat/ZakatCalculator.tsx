import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"

export function ZakatCalculator() {
    const { t } = useTranslation()
    const [cash, setCash] = useState<number>(0)
    const [gold, setGold] = useState<number>(0)
    const [silver, setSilver] = useState<number>(0)
    const [stocks, setStocks] = useState<number>(0)
    const [debts, setDebts] = useState<number>(0)

    const [totalAssets, setTotalAssets] = useState<number>(0)
    const [zakatDue, setZakatDue] = useState<number>(0)

    useEffect(() => {
        const total = cash + gold + silver + stocks - debts
        const due = total > 85 * 250 ? total * 0.025 : 0

        setTotalAssets(Math.max(0, total))
        setZakatDue(Math.max(0, due))
    }, [cash, gold, silver, stocks, debts])

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>{t('zakat.calculator.title')}</CardTitle>
                <CardDescription>{t('zakat.calculator.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="cash">{t('zakat.calculator.cash')}</Label>
                        <Input
                            id="cash"
                            type="number"
                            value={cash}
                            onChange={(e) => setCash(Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="gold">{t('zakat.calculator.gold')}</Label>
                        <Input
                            id="gold"
                            type="number"
                            value={gold}
                            onChange={(e) => setGold(Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="silver">{t('zakat.calculator.silver')}</Label>
                        <Input
                            id="silver"
                            type="number"
                            value={silver}
                            onChange={(e) => setSilver(Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stocks">{t('zakat.calculator.stocks')}</Label>
                        <Input
                            id="stocks"
                            type="number"
                            value={stocks}
                            onChange={(e) => setStocks(Number(e.target.value))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="debts">{t('zakat.calculator.debts')}</Label>
                        <Input
                            id="debts"
                            type="number"
                            value={debts}
                            onChange={(e) => setDebts(Number(e.target.value))}
                        />
                    </div>
                </div>

                <div className="mt-6 rounded-lg bg-primary/10 p-6 text-center">
                    <div className="text-sm font-medium text-muted-foreground">{t('zakat.calculator.total_due')}</div>
                    <div className="text-4xl font-bold text-primary">{zakatDue.toFixed(2)} SAR</div>
                    <div className="mt-2 text-xs text-muted-foreground">
                        {t('zakat.calculator.net_assets')}: {totalAssets.toFixed(2)} SAR
                    </div>
                </div>
                <Button className="w-full">{t('zakat.calculator.pay_now')}</Button>
            </CardContent>
        </Card>
    )
}

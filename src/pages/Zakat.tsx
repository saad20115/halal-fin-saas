import { ZakatCalculator } from "@/components/features/zakat/ZakatCalculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "react-i18next"

export default function ZakatPage() {
    const { t } = useTranslation()

    return (
        <div className="container py-10">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight">{t('zakat.title')}</h1>
                <p className="mt-2 text-muted-foreground">
                    {t('zakat.subtitle')}
                </p>
            </div>

            <div className="flex flex-col items-center space-y-8">
                <ZakatCalculator />

                <div className="w-full max-w-2xl">
                    <h2 className="mb-4 text-xl font-bold">{t('zakat.history.title')}</h2>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">{t('zakat.history.header')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between border-b pb-4">
                                    <div>
                                        <div className="font-medium">{t('zakat.history.zakat_payment')}</div>
                                        <div className="text-sm text-muted-foreground">Ramadan 1446</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold">- SAR 1,200.00</div>
                                        <div className="text-xs text-green-600">{t('zakat.history.verified')}</div>
                                    </div>
                                </div>
                                <div className="flex justify-between border-b pb-4">
                                    <div>
                                        <div className="font-medium">{t('zakat.history.sadaqah')}</div>
                                        <div className="text-sm text-muted-foreground">{t('zakat.history.orphan')}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold">- SAR 300.00</div>
                                        <div className="text-xs text-green-600">{t('zakat.history.verified')}</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

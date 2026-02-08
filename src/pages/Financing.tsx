import { useState } from "react"
import { FinancingCalculator } from "@/components/features/financing/FinancingCalculator"
import { ProductComparison } from "@/components/features/financing/ProductComparison"
import { useTranslation } from "react-i18next"

export default function FinancingPage() {
    const { t } = useTranslation()
    const [assetValue, setAssetValue] = useState<number>(100000)
    const [downPayment, setDownPayment] = useState<number>(20000)
    const [duration, setDuration] = useState<number>(60)

    const financingAmount = assetValue - downPayment

    return (
        <div className="container py-10">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight">{t('financing.title')}</h1>
                <p className="mt-2 text-muted-foreground">
                    {t('financing.subtitle')}
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <FinancingCalculator
                        assetValue={assetValue}
                        setAssetValue={setAssetValue}
                        downPayment={downPayment}
                        setDownPayment={setDownPayment}
                        duration={duration}
                        setDuration={setDuration}
                    />
                </div>
                <div className="lg:col-span-2">
                    <ProductComparison amount={financingAmount} duration={duration} />
                </div>
            </div>
        </div>
    )
}

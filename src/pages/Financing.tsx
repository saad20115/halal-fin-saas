import { useState } from "react"
import { FinancingCalculator } from "@/components/features/financing/FinancingCalculator"
import { ProductComparison } from "@/components/features/financing/ProductComparison"
import { FinancingRequestForm } from "@/components/features/financing/FinancingRequestForm"
import { FinancingHistory } from "@/components/features/financing/FinancingHistory"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

            <Tabs defaultValue="calculator" className="space-y-6">
                <div className="flex justify-center">
                    <TabsList className="grid w-full max-w-md grid-cols-3">
                        <TabsTrigger value="calculator">{t('financing.tabs.calculator') || 'Calculator'}</TabsTrigger>
                        <TabsTrigger value="apply">{t('financing.tabs.apply') || 'Apply Now'}</TabsTrigger>
                        <TabsTrigger value="history">{t('financing.tabs.history') || 'My Requests'}</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="calculator" className="space-y-6">
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
                </TabsContent>

                <TabsContent value="apply">
                    <div className="mx-auto max-w-2xl">
                        <FinancingRequestForm />
                    </div>
                </TabsContent>

                <TabsContent value="history">
                    <div className="mx-auto max-w-4xl">
                        <FinancingHistory />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

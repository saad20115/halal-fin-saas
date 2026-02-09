import { ZakatCalculator } from "@/components/features/zakat/ZakatCalculator"
import { ZakatHistory } from "@/components/features/zakat/ZakatHistory"
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
                    <ZakatHistory />
                </div>
            </div>
        </div>
    )
}

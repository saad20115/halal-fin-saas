import { PortfolioSummary } from "@/components/features/investment/PortfolioSummary"
import { PortfolioChart } from "@/components/features/investment/PortfolioChart"
import { SukukMarketplace } from "@/components/features/investment/SukukMarketplace"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTranslation } from "react-i18next"

export default function InvestmentsPage() {
    const { t } = useTranslation()

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">{t('investments.title')}</h2>
            </div>
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">{t('investments.overview')}</TabsTrigger>
                    <TabsTrigger value="sukuk">{t('investments.sukuk')}</TabsTrigger>
                    <TabsTrigger value="funds">{t('investments.funds')}</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <PortfolioSummary />
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <PortfolioChart />
                    </div>
                </TabsContent>
                <TabsContent value="sukuk" className="space-y-4">
                    <SukukMarketplace />
                </TabsContent>
                <TabsContent value="funds">
                    <div className="flex h-[450px] items-center justify-center rounded-md border border-dashed text-muted-foreground">
                        {t('investments.coming_soon')}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

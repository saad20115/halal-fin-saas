import { ShariahChecker } from "@/components/features/audit/ShariahChecker"
import { AuditLogs } from "@/components/features/audit/AuditLogs"
import { useTranslation } from "react-i18next"

export default function AuditPage() {
    const { t } = useTranslation()

    return (
        <div className="container py-10">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight">{t('audit.title')}</h1>
                <p className="mt-2 text-muted-foreground">
                    {t('audit.subtitle')}
                </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                <ShariahChecker />
                <AuditLogs />
            </div>
        </div>
    )
}

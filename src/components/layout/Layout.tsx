import { Outlet } from "react-router-dom";
import { LanguageToggle } from "./LanguageToggle";
import { useTranslation } from "react-i18next";

export default function Layout() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <header className="border-b">
                <div className="container flex h-16 items-center px-4">
                    <h1 className="text-xl font-bold">{t('app.title')}</h1>
                    <nav className="ml-auto flex items-center gap-4">
                        <a href="/" className="text-sm font-medium hover:text-primary">{t('app.nav.home')}</a>
                        <a href="/dashboard" className="text-sm font-medium hover:text-primary">{t('app.nav.dashboard')}</a>
                        <a href="/financing" className="text-sm font-medium hover:text-primary">{t('app.nav.financing')}</a>
                        <a href="/invest" className="text-sm font-medium hover:text-primary">{t('app.nav.invest')}</a>
                        <a href="/zakat" className="text-sm font-medium hover:text-primary">{t('app.nav.zakat')}</a>
                        <a href="/audit" className="text-sm font-medium hover:text-primary">{t('app.nav.audit')}</a>
                        <a href="/profile" className="text-sm font-medium hover:text-primary">{t('app.nav.profile')}</a>
                        <LanguageToggle />
                    </nav>
                </div>
            </header>
            <main className="container py-6">
                <Outlet />
            </main>
            <footer className="border-t py-6">
                <div className="container text-center text-sm text-muted-foreground">
                    {t('app.footer')}
                </div>
            </footer>
        </div>
    );
}

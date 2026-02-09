import { Outlet } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { LanguageToggle } from "./LanguageToggle"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"

export default function Layout() {
    const { t } = useTranslation()
    const { user, signOut } = useAuth()

    return (
        <div className="min-h-screen flex flex-col">
            <header className="border-b">
                <div className="container mx-auto flex h-16 items-center px-4">
                    <h1 className="text-xl font-bold">{t('app.title')}</h1>
                    <nav className="ml-auto flex items-center gap-4">
                        <a href="/" className="text-sm font-medium hover:text-primary">{t('app.nav.home')}</a>
                        <a href="/dashboard" className="text-sm font-medium hover:text-primary">{t('app.nav.dashboard')}</a>
                        <a href="/financing" className="text-sm font-medium hover:text-primary">{t('app.nav.financing')}</a>
                        <a href="/invest" className="text-sm font-medium hover:text-primary">{t('app.nav.invest')}</a>
                        <a href="/zakat" className="text-sm font-medium hover:text-primary">{t('app.nav.zakat')}</a>
                        <a href="/audit" className="text-sm font-medium hover:text-primary">{t('app.nav.audit')}</a>

                        {user ? (
                            <>
                                <a href="/profile" className="text-sm font-medium hover:text-primary flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    {t('app.nav.profile')}
                                </a>
                                <Button variant="ghost" size="sm" onClick={() => signOut()}>
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <a href="/login" className="text-sm font-medium hover:text-primary">{t('auth.login')}</a>
                        )}

                        <LanguageToggle />
                    </nav>
                </div>
            </header>
            <main className="flex-1">
                <Outlet />
            </main>
            <footer className="border-t py-6">
                <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                    {t('app.footer')}
                </div>
            </footer>
        </div>
    )
}

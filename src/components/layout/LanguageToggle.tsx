import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export function LanguageToggle() {
    const { i18n } = useTranslation()

    useEffect(() => {
        document.documentElement.dir = i18n.dir(i18n.language)
        document.documentElement.lang = i18n.language
    }, [i18n.language])

    const toggleLang = () => {
        const newLang = i18n.language === "en" ? "ar" : "en"
        i18n.changeLanguage(newLang)
    }

    return (
        <Button variant="ghost" size="icon" onClick={toggleLang}>
            <Globe className="h-4 w-4" />
            <span className="sr-only">
                {i18n.language === "en" ? "Switch to Arabic" : "Switch to English"}
            </span>
            <span className="ml-2 text-xs font-bold">{i18n.language.toUpperCase()}</span>
        </Button>
    )
}

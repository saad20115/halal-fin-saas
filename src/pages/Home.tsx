import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function Home() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col items-center justify-center space-y-8 py-12 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                {t('home.hero.title')}
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
                {t('home.hero.subtitle')}
            </p>
            <div className="flex gap-4">
                <Button variant="default" size="lg">{t('home.hero.get_started')}</Button>
                <Button variant="outline" size="lg">{t('home.hero.learn_more')}</Button>
            </div>
        </div>
    );
}

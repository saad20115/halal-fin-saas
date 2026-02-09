import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import {
    TrendingUp,
    Shield,
    Calculator,
    FileCheck,
    Wallet,
    Users,
    BarChart3,
    CheckCircle2,
    ArrowRight,
    Sparkles
} from "lucide-react"

export default function HomePage() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const features = [
        {
            icon: TrendingUp,
            title: t('home.features.financing.title'),
            description: t('home.features.financing.desc'),
            color: "text-blue-500"
        },
        {
            icon: BarChart3,
            title: t('home.features.investment.title'),
            description: t('home.features.investment.desc'),
            color: "text-green-500"
        },
        {
            icon: Calculator,
            title: t('home.features.zakat.title'),
            description: t('home.features.zakat.desc'),
            color: "text-purple-500"
        },
        {
            icon: FileCheck,
            title: t('home.features.audit.title'),
            description: t('home.features.audit.desc'),
            color: "text-orange-500"
        }
    ]

    const stats = [
        { value: "100%", label: t('home.stats.compliant') },
        { value: "1M+", label: t('home.stats.users') },
        { value: "50+", label: t('home.stats.products') },
        { value: "24/7", label: t('home.stats.support') }
    ]

    const steps = [
        {
            number: "1",
            title: t('home.how_it_works.step1.title'),
            description: t('home.how_it_works.step1.desc')
        },
        {
            number: "2",
            title: t('home.how_it_works.step2.title'),
            description: t('home.how_it_works.step2.desc')
        },
        {
            number: "3",
            title: t('home.how_it_works.step3.title'),
            description: t('home.how_it_works.step3.desc')
        }
    ]

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-32">
                <div className="container px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <Badge className="mb-4 bg-primary/10 text-primary">
                            <Sparkles className="mr-1 h-3 w-3" />
                            {t('home.hero.badge')}
                        </Badge>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
                            {t('home.hero.title')}
                        </h1>
                        <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
                            {t('home.hero.subtitle')}
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Button size="lg" onClick={() => navigate("/register")} className="gap-2">
                                {t('home.hero.cta_primary')}
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                            <Button size="lg" variant="outline" onClick={() => navigate("/financing")}>
                                {t('home.hero.cta_secondary')}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-24 left-0 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
            </section>

            {/* Stats Section */}
            <section className="border-y bg-muted/30 py-12">
                <div className="container px-4">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-bold text-primary sm:text-4xl">{stat.value}</div>
                                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
                <div className="container px-4">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            {t('home.features_section.title')}
                        </h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground">
                            {t('home.features_section.subtitle')}
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <Card key={index} className="relative overflow-hidden transition-all hover:shadow-lg">
                                <CardHeader>
                                    <div className={`mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ${feature.color}`}>
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    <CardDescription>{feature.description}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-muted/30 py-20">
                <div className="container px-4">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            {t('home.how_it_works.title')}
                        </h2>
                        <p className="mx-auto max-w-2xl text-muted-foreground">
                            {t('home.how_it_works.subtitle')}
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                                    {step.number}
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                                {index < steps.length - 1 && (
                                    <div className="absolute right-0 top-8 hidden h-0.5 w-full bg-border md:block" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20">
                <div className="container px-4">
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="mb-6 text-3xl font-bold tracking-tight">
                                {t('home.benefits.title')}
                            </h2>
                            <div className="space-y-4">
                                {[
                                    t('home.benefits.benefit1'),
                                    t('home.benefits.benefit2'),
                                    t('home.benefits.benefit3'),
                                    t('home.benefits.benefit4'),
                                    t('home.benefits.benefit5')
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                                        <p className="text-muted-foreground">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    {t('home.trust.title')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    {t('home.trust.description')}
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-lg border bg-background p-4">
                                        <Wallet className="mb-2 h-8 w-8 text-primary" />
                                        <p className="text-sm font-medium">{t('home.trust.certified')}</p>
                                    </div>
                                    <div className="rounded-lg border bg-background p-4">
                                        <Users className="mb-2 h-8 w-8 text-primary" />
                                        <p className="text-sm font-medium">{t('home.trust.trusted')}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary py-20 text-primary-foreground">
                <div className="container px-4 text-center">
                    <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                        {t('home.cta.title')}
                    </h2>
                    <p className="mb-8 text-lg opacity-90">
                        {t('home.cta.subtitle')}
                    </p>
                    <Button
                        size="lg"
                        variant="secondary"
                        onClick={() => navigate("/register")}
                        className="gap-2"
                    >
                        {t('home.cta.button')}
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </section>
        </div>
    )
}

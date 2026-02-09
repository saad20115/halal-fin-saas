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
    Sparkles,
    Zap
} from "lucide-react"

export default function HomePage() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const features = [
        {
            icon: TrendingUp,
            title: t('home.features.financing.title'),
            description: t('home.features.financing.desc'),
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            icon: BarChart3,
            title: t('home.features.investment.title'),
            description: t('home.features.investment.desc'),
            gradient: "from-green-500 to-emerald-500"
        },
        {
            icon: Calculator,
            title: t('home.features.zakat.title'),
            description: t('home.features.zakat.desc'),
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: FileCheck,
            title: t('home.features.audit.title'),
            description: t('home.features.audit.desc'),
            gradient: "from-orange-500 to-red-500"
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
        <div className="flex flex-col overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-950 dark:to-cyan-950">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-400/30 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/30 to-teal-400/30 blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-400/20 to-fuchsia-400/20 blur-3xl animate-pulse delay-500" />
                </div>

                <div className="container relative px-4 py-20">
                    <div className="mx-auto max-w-4xl text-center space-y-8 animate-fade-in">
                        <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white border-none shadow-lg shadow-violet-500/50 animate-bounce-slow">
                            <Sparkles className="mr-2 h-4 w-4" />
                            {t('home.hero.badge')}
                        </Badge>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-violet-900 dark:from-white dark:via-blue-200 dark:to-violet-200 bg-clip-text text-transparent animate-slide-up">
                            {t('home.hero.title')}
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up animation-delay-200">
                            {t('home.hero.subtitle')}
                        </p>

                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-slide-up animation-delay-400">
                            <Button
                                size="lg"
                                onClick={() => navigate("/register")}
                                className="gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-xl shadow-violet-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                            >
                                <Zap className="h-5 w-5 group-hover:animate-pulse" />
                                {t('home.hero.cta_primary')}
                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => navigate("/financing")}
                                className="border-2 border-violet-300 hover:bg-violet-50 dark:border-violet-700 dark:hover:bg-violet-950 transition-all duration-300 hover:scale-105"
                            >
                                {t('home.hero.cta_secondary')}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-20 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="container relative px-4">
                    <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center transform transition-all duration-300 hover:scale-110 animate-fade-in"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 drop-shadow-lg">
                                    {stat.value}
                                </div>
                                <div className="text-sm md:text-base text-white/90 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gradient-to-b from-white to-violet-50 dark:from-gray-900 dark:to-violet-950">
                <div className="container px-4">
                    <div className="mb-16 text-center space-y-4 animate-fade-in">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                            {t('home.features_section.title')}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {t('home.features_section.subtitle')}
                        </p>
                    </div>

                    <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature, index) => (
                            <Card
                                key={index}
                                className="group relative overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                <CardHeader className="relative">
                                    <div className={`mb-3 sm:mb-4 inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                        <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-lg sm:text-xl md:text-2xl group-hover:text-violet-600 transition-colors duration-300">
                                        {feature.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm sm:text-base">
                                        {feature.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-100 via-fuchsia-100 to-pink-100 dark:from-violet-950 dark:via-fuchsia-950 dark:to-pink-950" />

                <div className="container relative px-4">
                    <div className="mb-16 text-center space-y-4 animate-fade-in">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                            {t('home.how_it_works.title')}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {t('home.how_it_works.subtitle')}
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-5xl gap-8 sm:gap-12 md:grid-cols-3 px-4">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="relative group animate-fade-in"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="relative z-10 space-y-4">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-3xl font-bold text-white shadow-2xl shadow-violet-500/50 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                        {step.number}
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-violet-600 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="absolute right-0 top-10 hidden h-1 w-full bg-gradient-to-r from-violet-300 to-fuchsia-300 dark:from-violet-700 dark:to-fuchsia-700 md:block" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits & Trust */}
            <section className="py-24 bg-white dark:bg-gray-900">
                <div className="container px-4">
                    <div className="grid gap-12 lg:grid-cols-2 items-center">
                        <div className="space-y-8 animate-slide-right">
                            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                                {t('home.benefits.title')}
                            </h2>
                            <div className="space-y-3 sm:space-y-4">
                                {[
                                    t('home.benefits.benefit1'),
                                    t('home.benefits.benefit2'),
                                    t('home.benefits.benefit3'),
                                    t('home.benefits.benefit4'),
                                    t('home.benefits.benefit5')
                                ].map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 p-4 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-950/30 transition-all duration-300 group animate-fade-in"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-violet-600 group-hover:scale-125 transition-transform" />
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Card className="relative overflow-hidden border-2 border-violet-200 dark:border-violet-800 shadow-2xl shadow-violet-500/20 animate-slide-left mx-4 lg:mx-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30" />
                            <CardHeader className="relative">
                                <CardTitle className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg">
                                        <Shield className="h-6 w-6 text-white" />
                                    </div>
                                    {t('home.trust.title')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative space-y-6">
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {t('home.trust.description')}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div className="group rounded-xl border-2 border-violet-200 dark:border-violet-800 bg-white dark:bg-gray-800 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <Wallet className="mb-3 h-10 w-10 text-violet-600 group-hover:scale-110 transition-transform" />
                                        <p className="font-semibold text-gray-900 dark:text-white">{t('home.trust.certified')}</p>
                                    </div>
                                    <div className="group rounded-xl border-2 border-violet-200 dark:border-violet-800 bg-white dark:bg-gray-800 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <Users className="mb-3 h-10 w-10 text-violet-600 group-hover:scale-110 transition-transform" />
                                        <p className="font-semibold text-gray-900 dark:text-white">{t('home.trust.trusted')}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

                <div className="container relative px-4 text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                        {t('home.cta.title')}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in animation-delay-200 px-4">
                        {t('home.cta.subtitle')}
                    </p>
                    <Button
                        size="lg"
                        onClick={() => navigate("/register")}
                        className="gap-2 bg-white text-violet-600 hover:bg-gray-100 shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-110 group animate-bounce-slow animation-delay-400"
                    >
                        <Sparkles className="h-5 w-5 group-hover:animate-spin" />
                        {t('home.cta.button')}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                    </Button>
                </div>
            </section>

            <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-left {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animate-slide-right {
          animation: slide-right 0.8s ease-out forwards;
        }

        .animate-slide-left {
          animation: slide-left 0.8s ease-out forwards;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
        </div>
    )
}

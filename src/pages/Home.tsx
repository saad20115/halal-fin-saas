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
    const { t, i18n } = useTranslation()
    const navigate = useNavigate()
    const isRTL = i18n.language === 'ar'

    const features = [
        {
            icon: TrendingUp,
            title: t('home.features.financing.title'),
            description: t('home.features.financing.desc'),
            gradient: "from-blue-600 to-cyan-600"
        },
        {
            icon: BarChart3,
            title: t('home.features.investment.title'),
            description: t('home.features.investment.desc'),
            gradient: "from-emerald-600 to-teal-600"
        },
        {
            icon: Calculator,
            title: t('home.features.zakat.title'),
            description: t('home.features.zakat.desc'),
            gradient: "from-indigo-600 to-purple-600"
        },
        {
            icon: FileCheck,
            title: t('home.features.audit.title'),
            description: t('home.features.audit.desc'),
            gradient: "from-amber-600 to-orange-600"
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
        <div className="flex flex-col overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
            {/* Hero Section */}
            <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 blur-3xl animate-pulse" />
                    <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-400/15 to-blue-400/15 blur-3xl animate-pulse delay-500" />
                </div>

                <div className="container relative mx-auto px-4 py-12 md:py-20">
                    <div className="mx-auto max-w-4xl text-center space-y-6 md:space-y-8 animate-fade-in">
                        <Badge className="mb-4 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-none shadow-lg shadow-blue-500/30 animate-bounce-slow">
                            <Sparkles className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                            {t('home.hero.badge')}
                        </Badge>

                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent animate-slide-up leading-tight">
                            {t('home.hero.title')}
                        </h1>

                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto animate-slide-up animation-delay-200 px-4">
                            {t('home.hero.subtitle')}
                        </p>

                        <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center animate-slide-up animation-delay-400 px-4">
                            <Button
                                size="lg"
                                onClick={() => navigate("/register")}
                                className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
                            >
                                <Zap className="h-5 w-5 group-hover:animate-pulse" />
                                {t('home.hero.cta_primary')}
                                <ArrowRight className={`h-4 w-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => navigate("/financing")}
                                className="border-2 border-blue-300 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-950 transition-all duration-300 hover:scale-105"
                            >
                                {t('home.hero.cta_secondary')}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-12 md:py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/10" />
                <div className="container relative mx-auto px-4">
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
            <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50 dark:from-gray-900 dark:to-slate-950">
                <div className="container mx-auto px-4">
                    <div className="mb-12 md:mb-16 text-center space-y-3 md:space-y-4 animate-fade-in px-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {t('home.features_section.title')}
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
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

                                <CardHeader className="relative text-center">
                                    <div className="mx-auto mb-3 sm:mb-4 inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-lg sm:text-xl md:text-2xl group-hover:text-blue-600 transition-colors duration-300">
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
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-100 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950" />

                <div className="container relative mx-auto px-4">
                    <div className="mb-12 md:mb-16 text-center space-y-3 md:space-y-4 animate-fade-in px-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {t('home.how_it_works.title')}
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
                            {t('home.how_it_works.subtitle')}
                        </p>
                    </div>

                    <div className="mx-auto grid max-w-5xl gap-8 sm:gap-12 md:grid-cols-3 px-4">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="relative group animate-fade-in text-center md:text-start"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="relative z-10 space-y-3 sm:space-y-4">
                                    <div className="mx-auto md:mx-0 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-2xl sm:text-3xl font-bold text-white shadow-2xl shadow-blue-500/30 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                                        {step.number}
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-10 hidden h-1 w-full bg-gradient-to-r from-blue-300 to-indigo-300 dark:from-blue-700 dark:to-indigo-700 md:block`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits & Trust */}
            <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 md:gap-12 lg:grid-cols-2 items-center">
                        <div className="space-y-6 md:space-y-8 animate-slide-right px-4 lg:px-0">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-center md:text-start">
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
                                        className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-300 group animate-fade-in"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 text-blue-600 group-hover:scale-125 transition-transform" />
                                        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed text-start">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Card className="relative overflow-hidden border-2 border-blue-200 dark:border-blue-800 shadow-2xl shadow-blue-500/20 animate-slide-left mx-4 lg:mx-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30" />
                            <CardHeader className="relative">
                                <CardTitle className="flex items-center gap-2 sm:gap-3 text-xl sm:text-2xl">
                                    <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
                                        <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                    </div>
                                    {t('home.trust.title')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="relative space-y-6">
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {t('home.trust.description')}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div className="group rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-800 p-4 sm:p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                                        <Wallet className="mx-auto mb-2 sm:mb-3 h-8 w-8 sm:h-10 sm:w-10 text-blue-600 group-hover:scale-110 transition-transform" />
                                        <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{t('home.trust.certified')}</p>
                                    </div>
                                    <div className="group rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-800 p-4 sm:p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center">
                                        <Users className="mx-auto mb-2 sm:mb-3 h-8 w-8 sm:h-10 sm:w-10 text-blue-600 group-hover:scale-110 transition-transform" />
                                        <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">{t('home.trust.trusted')}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-16 md:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />

                <div className="container relative mx-auto px-4 text-center space-y-6 md:space-y-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg animate-fade-in">
                        {t('home.cta.title')}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in animation-delay-200 px-4">
                        {t('home.cta.subtitle')}
                    </p>
                    <Button
                        size="lg"
                        onClick={() => navigate("/register")}
                        className="gap-2 bg-white text-blue-600 hover:bg-gray-100 shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105 md:hover:scale-110 group animate-bounce-slow animation-delay-400 text-sm sm:text-base"
                    >
                        <Sparkles className="h-5 w-5 group-hover:animate-spin" />
                        {t('home.cta.button')}
                        <ArrowRight className={`h-4 w-4 group-hover:translate-x-2 transition-transform ${isRTL ? 'rotate-180' : ''}`} />
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

import { Link } from "react-router-dom"
import { UserRegisterForm } from "@/components/auth/user-register-form"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { ArrowLeft } from "lucide-react"

export default function RegisterPage() {
    const { t } = useTranslation()
    return (
        <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-primary" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Link to="/">HalalFin</Link>
                </div>
                <div className="relative z-20 mt-auto">
                    <blockquote className="space-y-2">
                        <p className="text-lg">
                            &ldquo;Building wealth the Halal way has never been easier. Join thousands of investors today.&rdquo;
                        </p>
                        <footer className="text-sm">Sarah Khan</footer>
                    </blockquote>
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link to="/">
                        <Button variant="ghost" size="sm" className="gap-2 mb-4">
                            <ArrowLeft className="h-4 w-4" />
                            {t('auth.back_to_home')}
                        </Button>
                    </Link>
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create an account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email below to create your account
                        </p>
                    </div>
                    <UserRegisterForm />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        <Link
                            to="/login"
                            className="hover:text-brand underline underline-offset-4"
                        >
                            Already have an account? Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

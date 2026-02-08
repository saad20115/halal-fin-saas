import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProductComparisonProps {
    amount: number
    duration: number
}

// Mock data
const PRODUCTS = [
    {
        id: 1,
        bank: "Al Rajhi Bank",
        name: "Auto Finance",
        rate: 3.5,
        type: "Murabaha",
        compliance: "Fully Compliant",
        logo: "https://placehold.co/40x40?text=ARB",
    },
    {
        id: 2,
        bank: "SNB",
        name: "Personal Finance",
        rate: 3.2,
        type: "Tawarruq",
        compliance: "Fully Compliant",
        logo: "https://placehold.co/40x40?text=SNB",
    },
    {
        id: 3,
        bank: "Alinma Bank",
        name: "Real Estate",
        rate: 4.1,
        type: "Ijarah",
        compliance: "Conditional",
        logo: "https://placehold.co/40x40?text=ALN",
    },
]

export function ProductComparison({ amount, duration }: ProductComparisonProps) {
    const calculateMonthly = (rate: number) => {
        const years = duration / 12
        const totalProfit = amount * (rate / 100) * years
        const total = amount + totalProfit
        return (total / duration).toFixed(2)
    }

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Recommended Financing Offers</h2>
            <div className="grid gap-4 md:grid-cols-3">
                {PRODUCTS.map((product) => (
                    <Card key={product.id} className="flex flex-col">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                            <img src={product.logo} alt={product.bank} className="h-10 w-10 rounded-full" />
                            <div>
                                <CardTitle className="text-base">{product.bank}</CardTitle>
                                <CardDescription>{product.name}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Profit Rate</span>
                                <span className="font-bold">{product.rate}%</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Monthly</span>
                                <span className="font-bold text-primary">{calculateMonthly(product.rate)} SAR</span>
                            </div>
                            <div className="mt-2 flex gap-2">
                                <Badge variant="outline">{product.type}</Badge>
                                <Badge variant={product.compliance === "Fully Compliant" ? "default" : "secondary"}>
                                    {product.compliance}
                                </Badge>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Apply Now</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

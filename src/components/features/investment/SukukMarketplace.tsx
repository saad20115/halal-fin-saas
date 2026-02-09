import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Skeleton } from "@/components/ui/skeleton"

interface SukukProduct {
    id: string
    issuer: string
    name: string
    sukuk_rating: string
    annual_yield: number
    duration_months: number
    min_investment: number
    risk_level: 'low' | 'medium' | 'high'
}

export function SukukMarketplace() {
    const [products, setProducts] = useState<SukukProduct[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        try {
            const { data, error } = await supabase
                .from('sukuk_products')
                .select('*')
                .eq('is_active', true)

            if (error) throw error
            setProducts(data || [])
        } catch (error) {
            console.error('Error fetching sukuk products:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i}>
                        <CardHeader>
                            <Skeleton className="h-4 w-1/3 mb-2" />
                            <Skeleton className="h-6 w-2/3" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-24 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Sukuk Marketplace</h2>
                <Button variant="outline">View All</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {products.map((sukuk) => (
                    <Card key={sukuk.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Badge variant={sukuk.risk_level === 'low' ? 'default' : 'secondary'}>
                                    {sukuk.risk_level.charAt(0).toUpperCase() + sukuk.risk_level.slice(1)} Risk
                                </Badge>
                                <span className="font-bold text-primary">{sukuk.annual_yield}% Yield</span>
                            </div>
                            <CardTitle className="mt-2 text-lg">{sukuk.issuer}</CardTitle>
                            <CardDescription className="line-clamp-1">{sukuk.name}</CardDescription>
                            <div className="text-xs font-medium bg-muted inline-block px-2 py-1 rounded">
                                Rating: {sukuk.sukuk_rating}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">Duration</span>
                                    <span className="font-medium">{sukuk.duration_months} Months</span>
                                </div>
                                <div className="flex justify-between border-b pb-2">
                                    <span className="text-muted-foreground">Min Investment</span>
                                    <span className="font-medium">{sukuk.min_investment.toLocaleString()} SAR</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">Invest Now</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}

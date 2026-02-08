import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const SUKUK_LIST = [
    {
        id: 1,
        issuer: "Saudi Aramco",
        rating: "A+",
        yield: "4.5%",
        duration: "5 Years",
        minInvest: 1000,
        risk: "Low",
    },
    {
        id: 2,
        issuer: "Al Rajhi Capital",
        rating: "AA",
        yield: "3.8%",
        duration: "3 Years",
        minInvest: 500,
        risk: "Very Low",
    },
    {
        id: 3,
        issuer: "Green Energy Sukuk",
        rating: "BBB",
        yield: "6.2%",
        duration: "7 Years",
        minInvest: 5000,
        risk: "Medium",
    },
]

export function SukukMarketplace() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Sukuk Marketplace</h2>
                <Button variant="outline">View All</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {SUKUK_LIST.map((sukuk) => (
                    <Card key={sukuk.id}>
                        <CardHeader>
                            <div className="flex justify-between">
                                <Badge variant={sukuk.risk === 'Low' || sukuk.risk === 'Very Low' ? 'default' : 'secondary'}>
                                    {sukuk.risk} Risk
                                </Badge>
                                <span className="font-bold text-primary">{sukuk.yield} Yield</span>
                            </div>
                            <CardTitle className="mt-2">{sukuk.issuer}</CardTitle>
                            <CardDescription>Rating: {sukuk.rating}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Duration</span>
                                    <span>{sukuk.duration}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Min Investment</span>
                                    <span>{sukuk.minInvest} SAR</span>
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

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Search, CheckCircle, AlertTriangle, XCircle } from "lucide-react"

export function ShariahChecker() {
    const [ticker, setTicker] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<{
        symbol: string
        compliance: "Compliant" | "Non-Compliant" | "Doubtful"
        score: number
        reason: string
    } | null>(null)

    const handleCheck = () => {
        if (!ticker) return
        setLoading(true)
        setResult(null)

        // Mock AI Analysis
        setTimeout(() => {
            const mockResults = [
                { symbol: ticker.toUpperCase(), compliance: "Compliant", score: 98, reason: "Business activities and financial ratios are within Shariah limits." },
                { symbol: ticker.toUpperCase(), compliance: "Non-Compliant", score: 45, reason: "High debt ratio (>33%) and involvement in prohibited sectors." },
                { symbol: ticker.toUpperCase(), compliance: "Doubtful", score: 60, reason: "Mixed income sources require purification." },
            ]
            const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
            setResult(randomResult as any)
            setLoading(false)
        }, 1500)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>AI Shariah Screener</CardTitle>
                <CardDescription>Analyze any stock or company for Shariah compliance instantly.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Enter Stock Symbol (e.g. 2222.SR)"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                    />
                    <Button onClick={handleCheck} disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                        Analyze
                    </Button>
                </div>

                {result && (
                    <div className="mt-4 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold">{result.symbol}</h3>
                                <div className="text-sm text-muted-foreground">Compliance Score: {result.score}/100</div>
                            </div>
                            <Badge variant={result.compliance === "Compliant" ? "default" : "destructive"}>
                                {result.compliance}
                            </Badge>
                        </div>

                        <div className="mt-4 flex items-start gap-2 rounded-md bg-muted p-3">
                            {result.compliance === "Compliant" && <CheckCircle className="h-5 w-5 text-green-500" />}
                            {result.compliance === "Non-Compliant" && <XCircle className="h-5 w-5 text-red-500" />}
                            {result.compliance === "Doubtful" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                            <p className="text-sm">{result.reason}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FinancingCalculatorProps {
    assetValue: number
    setAssetValue: (val: number) => void
    downPayment: number
    setDownPayment: (val: number) => void
    duration: number
    setDuration: (val: number) => void
}

export function FinancingCalculator({
    assetValue,
    setAssetValue,
    downPayment,
    setDownPayment,
    duration,
    setDuration,
}: FinancingCalculatorProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Calculator Inputs</CardTitle>
                <CardDescription>Adjust values to see offers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="assetValue">Asset Value (SAR)</Label>
                    <Input
                        id="assetValue"
                        type="number"
                        value={assetValue}
                        onChange={(e) => setAssetValue(Number(e.target.value))}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="downPayment">Down Payment (SAR)</Label>
                    <Input
                        id="downPayment"
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="duration">Duration (Months)</Label>
                    <Input
                        id="duration"
                        type="number"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

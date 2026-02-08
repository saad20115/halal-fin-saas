import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', value: 40000 },
    { name: 'Feb', value: 42000 },
    { name: 'Mar', value: 41000 },
    { name: 'Apr', value: 44000 },
    { name: 'May', value: 43500 },
    { name: 'Jun', value: 45231 },
];

export function PortfolioChart() {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>
                    Your portfolio growth over the last 6 months.
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `SAR ${value}`}
                        />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}

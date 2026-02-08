import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const LOGS = [
    { id: 1, action: "Fatwa Issued", entity: "Financing Product #102", user: "Shariah Board", time: "2 hours ago" },
    { id: 2, action: "Compliance Check", entity: "User Investment Portfolio", user: "System (AI)", time: "5 hours ago" },
    { id: 3, action: "Zakat Payment Verified", entity: "Transaction #9921", user: "Admin", time: "1 day ago" },
    { id: 4, action: "New Product Approval", entity: "Murabaha Auto", user: "Shariah Board", time: "2 days ago" },
]

export function AuditLogs() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Immutable Audit Logs</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>A list of recent auditable actions on the platform.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Action</TableHead>
                            <TableHead>Entity</TableHead>
                            <TableHead>User / System</TableHead>
                            <TableHead className="text-right">Timestamp</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {LOGS.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell className="font-medium">{log.action}</TableCell>
                                <TableCell>{log.entity}</TableCell>
                                <TableCell>{log.user}</TableCell>
                                <TableCell className="text-right">{log.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

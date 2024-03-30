import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TCompany } from "@/types"


export function DashTable({ listCompany }: {
    listCompany: TCompany[]
}) {
    return (
        <Table >
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {listCompany.map((company, index) => (
                    <TableRow key={index}>
                        <TableCell>{company.companyName}</TableCell>
                        <TableCell>{company.companySector}</TableCell>
                        <TableCell>{company.companyLocation}</TableCell>
                        <TableCell className="text-right">{company.companyNumber}</TableCell>
                    </TableRow>
                ))}
            </TableBody>

        </Table>
    )
}

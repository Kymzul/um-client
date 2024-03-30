
import { getListCompany } from "@/app/action/company-action"
import { MainHeader } from "@/app/components/header/main-header"
import { HistoryDataTableDemo } from "@/app/components/table/history-table"
import { Themetoggle } from "@/app/components/theme/toggle-theme"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { TCompany } from "@/types"

export default async function HistoryPage() {

    const listCompany: TCompany[] = await getListCompany();

    return (
        <div className="flex flex-col w-full p-8 gap-5">
            <BuildHeader />
            <Card className="min-w-min">
                <CardContent>
                    <HistoryDataTableDemo data={listCompany} />
                </CardContent>
            </Card>
        </div>
    )
}

function BuildHeader() {
    return (
        <div className="border-b pb-5">
            <MainHeader title="History Company" desc="Here is the overview for all company." />
        </div>
    )
}

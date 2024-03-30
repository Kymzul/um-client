import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardCard, { DashboardCardContent, DashboardCardProps } from "../components/card/dash-card";
import BarChart from "../components/chart/dash-chart";
import { Themetoggle } from "../components/theme/toggle-theme";
import { HistoryDataTableDemo } from "../components/table/history-table";
import { Button } from "@/components/ui/button";
import { Bot, CreditCard, File, Folder, Folders, PercentDiamond, Plus } from "lucide-react";
import { DatePopover } from "../components/popover/date-popover";
import { YearPopover } from "../components/popover/year-popover";
import { Calendar } from "@/components/ui/calendar";
import PieDashChart from "../components/chart/pie-chart";
import { func } from "prop-types";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import Example from "../components/chart/pie-empty-chart";
import PieEmptyChart from "../components/chart/pie-empty-chart";
import { TCompany } from "@/types";
import { getListCompany } from "../action/company-action";
import { DashTable } from "../components/table/dash-table";


const listDashCard: DashboardCardProps[] = [
    {
        label: "Total File",
        content: "20",
        desc: "Total file has been uploaded",
        icon: Folders
    },
    {
        label: "Recent Chatbot",
        content: "Zetten",
        desc: "Zetten is your recent company chatbot",
        icon: Bot
    },


]

export default async function DashboardPage() {
    const listCompany: TCompany[] = await getListCompany();
    return (
        <div className="flex flex-col gap-5 w-full p-8">

            <BuildHeader />
            <BuildListDash />
            <BuildBarChart />
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 transition-all">

                <div className="flex flex-col gap-2 transition-all">

                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>
                                Completed Screenings
                            </CardTitle>
                            <CardDescription>
                                Companies that have completed the full shariah compliance screening process.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="w-full  flex items-center">
                            <PieEmptyChart />
                        </CardContent>
                    </Card>

                </div>

                <Card >
                    <CardHeader>
                        <CardTitle>Recent Screening</CardTitle>
                        <CardDescription>Recent Screening the last month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DashTable listCompany={listCompany} />

                    </CardContent>

                </Card>

            </section>
        </div >
    )
}

function BuildHeader() {
    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-2">
                <h1 className="xs:text-md md:text-2xl font-semibold">Welcome Back, Haziq</h1>
                <h1 className="xs:text-xs md:text-md font-light">Here your overview</h1>
            </div>
            <Themetoggle />
        </div>

    )
}



function BuildListDash() {
    return (
        <section className="grid w-full grid-cols-1  xl:grid-cols-3 gap-4 gap-x-8 transition-all">
            {
                listDashCard.map((eachCard, index) => {
                    return (
                        <DashboardCard dash={eachCard} key={index} />
                    )
                })
            }
            <BuildProgressBar />
        </section>
    )
}

function BuildProgressBar() {
    return (
        <DashboardCardContent>

            <div className="flex flex-col gap-4">
                <section className="flex justify-between items-center gap-2">
                    <p className="text-sm">Progress</p>
                    <PercentDiamond className="h-5 w-5 text-gray-400" />
                </section>

                <Slider
                    defaultValue={[50]}
                    max={100}
                    step={1}
                    disabled
                    className={cn("w-[60%]")}
                />

                <section className="flex flex-row items-center justify-between text-xs text-gray-500">
                    <p>Number of Company</p>
                    <p>20/200</p>
                </section>
            </div>


        </DashboardCardContent>
    )
}

function BuildBarChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row items-center justify-between">
                    Recent Screening
                    <DatePopover />
                </CardTitle>
            </CardHeader>
            <BarChart />
        </Card>
    )
}


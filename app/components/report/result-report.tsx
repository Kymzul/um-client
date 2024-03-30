import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TData } from "@/types";
import { Edit, Plus } from "lucide-react";
import Image from "next/image";
import { func } from "prop-types";

interface ReportPageProps {
    components: { id: string; content: string }[];
    twentyComponents: { id: string; content: string }[];
    data: TData
}
export default function ReportPage({ components, twentyComponents, data }: ReportPageProps) {
    return (
        <div className="flex flex-col gap-4 p-8 w-full">
            {/**Title Report */}
            <div className="flex w-full items-center justify-center">
                <Image src="/shariahtick.svg" alt="Shariah Viz Icon" width={200} height={50} />
            </div>

            <div className="flex flex-col w-full gap-4">
                <div className="flex flex-row items-center justify-between w-full">
                    <section className="flex flex-col gap-1 text-xs font-light text-gray-400">
                        <p>Total Revenue: RM3764.60</p>
                        <p>Profit Before Tax: RM3764.60</p>
                        <p>Total Assets: RM42.60</p>
                    </section>

                </div>


                <div className="flex flex-col gap-3 rounded-md shadow border">
                    <div className="border-b-2">
                        <div className="flex flex-row justify-between items-center p-2">
                            <Label>5% Screening Benchmark</Label>

                        </div>

                    </div>
                    {components.map((_, index) => (
                        <BuildForm id={_.id} />
                    ))}


                    <div className="flex flex-row items-center justify-between p-2 border-t-2">
                        <Label>Total</Label>
                        <div className="flex items-center gap-2">
                            <Input className="w-[200px]" placeholder="Total" disabled />

                        </div>
                    </div>
                </div>


                <div className="flex flex-col gap-3 rounded-md shadow border">
                    <div className="border-b-2">
                        <div className="flex flex-row justify-between items-center p-2">
                            <Label>20% Screening Benchmark</Label>
                        </div>
                    </div>

                    {twentyComponents.map((_, index) => (
                        <BuildForm id={_.id} />
                    ))}



                    <div className="flex flex-row items-center justify-between p-2 border-t-2">
                        <Label>Total</Label>
                        <div className="flex items-center gap-2">
                            <Input className="w-[200px]" placeholder="Total" disabled />

                        </div>
                    </div>
                </div>


                <div className="flex flex-col gap-3 rounded-md shadow border">
                    <div className="border-b-2">
                        <div className="flex flex-row justify-between items-center px-2 py-4">
                            <Label>33% Cash Screening Benchmark</Label>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 p-2" >
                        <Input placeholder="Eg. Total Cash" />
                        <Input className="w-[100px]" placeholder="Amount" />


                    </div>

                    <div className="flex flex-row gap-2 p-2" >
                        <Input placeholder="Eg. Cash at Bank" />
                        <Input className="w-[100px]" placeholder="Amount" />


                    </div>

                    <div className="flex flex-row gap-2 p-2" >
                        <Input placeholder="Eg. Deposit" />
                        <Input className="w-[100px]" placeholder="Amount" />


                    </div>

                    <div className="flex flex-row items-center justify-between p-2 border-t-2">
                        <Label>Total</Label>
                        <div className="flex items-center gap-2">
                            <Input className="w-[200px]" placeholder="Total" disabled />

                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 rounded-md shadow border">
                    <div className="border-b-2">
                        <div className="flex flex-row justify-between items-center px-2 py-4">
                            <Label>33% Debt Screening Benchmark</Label>
                        </div>
                    </div>

                    <div className="flex flex-row gap-2 p-2" >
                        <Input placeholder="Eg. Total Debt" />
                        <Input className="w-[100px]" placeholder="Amount" />


                    </div>

                    <div className="flex flex-col gap-2 p-2" >
                        <p>Current</p>
                        <p>{data.current}</p>


                    </div>



                    <div className="flex flex-col gap-2 p-2" >
                        <p>Non Current</p>
                        <p>{data.non_current}</p>
                    </div>


                    <div className="flex flex-row items-center justify-between p-2 border-t-2">
                        <Label>Total</Label>
                        <div className="flex items-center gap-2">
                            <Input className="w-[200px]" placeholder="Total" disabled />

                        </div>
                    </div>
                </div>

            </div>
            {/**Copyright */}
            <div className="text-xs text-slate-600">
                Copyright by ShariahViz Sdn Bhd 2024
            </div>
        </div>
    )
}

function BuildForm({ id }: {
    id: string
}) {
    return (
        <div className="flex flex-row gap-2 p-2" key={id}>
            <Input placeholder={id.toString()} />
            <Input className="w-[100px]" placeholder="Amount" />

        </div>
    )
}


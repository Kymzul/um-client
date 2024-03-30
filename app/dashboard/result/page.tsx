'use client'
import { SubmitButton } from "@/app/components/button/submit-button";
import { MainHeader } from "@/app/components/header/main-header";
import { DetailTable } from "@/app/components/table/detail-table";
import { ResultTimeline } from "@/app/components/timeline/result-timeline";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheckBig, Edit, Minus, Plus, Printer } from "lucide-react";
import Link from "next/link";
import { listDetail } from "../[companyID]/detail/page";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { FormEvent, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { add } from "date-fns";
import toast from "react-hot-toast";
import { SuggestSheet } from "@/app/components/sheet/suggest-sheet";
import ReportPage from "@/app/components/report/result-report";
import { TCompany, TData } from "@/types";
import { number } from "prop-types";



interface BuildFormProps {
    onDelete: () => void;
    id: string;
    title: string
}

export default function AnalyzeResultPage() {
    const [isPrint, setPrint] = useState(false);
    const [components, setComponents] = useState([{ id: '1', content: "Component 1" }]);

    const [twentyComponents, setTwentyComponents] = useState([{ id: '1', content: "Component 1" }]);
    const componentRef = useRef<HTMLDivElement>(null); // Specify the type of the ref

    const [data, setData] = useState<TData | null>(null);

    const [fiveTotal, setFiveTotal] = useState<number>(0);
    const [twentyTotal, setTwentyTotal] = useState<number>(0);
    const [totalCash, setTotalCash] = useState<number>(0);
    const [totalDebt, setTotalDebt] = useState<number>(0);
    const [current, setCurrent] = useState<number>(0);
    const [noncurrent, setNonCurrent] = useState<number>(0);


    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/company`);
                if (response.ok) {
                    const data = await response.json();
                    const res = await data.data;
                    setData(res);

                } else {
                    throw new Error("Failed to fetch company data");
                }
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        fetchCompanyData();
    }, []);

    const addComponent = () => {
        if (components.length == 5) {
            toast.error('Limit 5')
        } else {
            const newComponent = { id: Date.now().toString(), content: "" };
            setComponents([...components, newComponent]);
        }

    };

    const deleteComponent = (id: string) => {
        setComponents(prevComponents => prevComponents.filter(component => component.id !== id));
    };

    const addTwentyComponet = () => {
        if (twentyComponents.length == 5) {
            toast.error('Limit 5')
        } else {
            const newComponent = { id: Date.now().toString(), content: "" };
            setTwentyComponents([...twentyComponents, newComponent]);
        }
    }

    const deleteTwentyComponent = (id: string) => {
        setTwentyComponents(prevComponents => prevComponents.filter(component => component.id !== id));
    }

    const handlePrintChange = () => {
        setPrint(!isPrint);
    }

    function convertNumber(value: number) {
        const formatNum = parseFloat(value.toFixed(2));
        return formatNum;
    }


    const calculateFive = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent form submission

        if (!data) {
            toast.success('no DATA');
        } else {
            let value: number = 0;
            // Create FormData object from the form
            const formData = new FormData(e.currentTarget);

            // Now you can access form data using the formData object
            for (let i = 0; i < components.length; i++) {
                const amout = formData.get(`fiveAmount${components[i].id}`);
                if (typeof amout === 'string') {

                    value += parseFloat(amout);

                }

            }

            const result = value / data?.title_revenue;
            setFiveTotal(result)
            toast.success(result.toString())
        }

    };

    const calculateTwenty = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent form submission

        if (!data) {
            toast.success('no DATA');
        } else {
            let value: number = 0;
            // Create FormData object from the form
            const formData = new FormData(e.currentTarget);

            // Now you can access form data using the formData object
            for (let i = 0; i < twentyComponents.length; i++) {
                const amout = formData.get(`twentyAmount${twentyComponents[i].id}`);
                if (typeof amout === 'string') {

                    value += parseFloat(amout);

                }

            }

            const result = value / data?.title_revenue;
            setTwentyTotal(result);
            toast.success(result.toString())
        }

    };



    return (
        <div className="flex flex-col w-full gap-5 p-8">

            <BuildHeader />


            <div className="flex flex-col gap-6" ref={componentRef}>
                <div className="flex flex-row items-center justify-between" >
                    <section className="flex flex-col gap-1 text-xs font-light text-gray-400">
                        <p>Total Revenue: RM{data?.title_revenue}</p>
                        <p>Profit Before Tax: RM{data?.title_pbt}</p>
                        <p>Total Assets: RM{data?.title_assets}</p>
                        <p>Current: RM{data?.current}</p>
                        <p>Non Current: RM{data?.non_current}</p>
                    </section>
                    <SuggestSheet />
                </div>

                <form onSubmit={calculateFive}>

                    <div className="flex flex-col gap-3 rounded-md shadow border">
                        <div className="border-b-2">
                            <div className="flex flex-row justify-between items-center p-2">
                                <Label>5% Screening Benchmark</Label>
                                <Button variant={"outline"} size={"icon"} onClick={addComponent}>
                                    <Plus />
                                </Button>
                            </div>
                        </div>

                        {components.map((_, index) => (
                            <div className="flex flex-row gap-2 p-2" key={_.id}>
                                <Input placeholder={'eg: Gambling'} name={`fiveLabel${_.id}`} />
                                <Input className="w-[100px]" placeholder="Amount" name={`fiveAmount${_.id}`} />

                                <Button variant={"outline"} size={"sm"} className="rounded-sm" onClick={() => calculateFive}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant={"outline"} size={"sm"} onClick={() => deleteComponent(_.id)}>
                                    <Minus className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}

                        <div className="flex flex-row items-center justify-between p-2 border-t-2">
                            <Label>Total</Label>
                            <div className="flex items-center gap-2">
                                <Input className="w-[200px]" placeholder="Total" disabled value={fiveTotal} />
                                <Button type="submit">Calculate</Button>
                            </div>
                        </div>
                    </div>
                </form>


                <form onSubmit={calculateTwenty}>
                    <div className="flex flex-col gap-3 rounded-md shadow border">
                        <div className="border-b-2">
                            <div className="flex flex-row justify-between items-center p-2">
                                <Label>20% Screening Benchmark</Label>
                                <Button variant={"outline"} size={"icon"} onClick={addTwentyComponet}>
                                    <Plus />
                                </Button>
                            </div>
                        </div>

                        {twentyComponents.map((_, index) => (
                            <div className="flex flex-row gap-2 p-2" key={_.id}>
                                <Input placeholder={'eg: Stock-Trading'} name={`twentyLabel${_.id}`} />
                                <Input className="w-[100px]" placeholder="Amount" name={`twentyAmount${_.id}`} />
                                <Button variant={"outline"} size={"sm"} className="rounded-sm">
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant={"outline"} size={"sm"} onClick={() => deleteTwentyComponent(_.id)}>
                                    <Minus className="h-4 w-4" />

                                </Button>
                            </div>

                        ))}

                        <div className="flex flex-row items-center justify-between p-2 border-t-2">
                            <Label>Total</Label>
                            <div className="flex items-center gap-2">
                                <Input className="w-[200px]" placeholder="Total" disabled value={twentyTotal} />
                                <Button type="submit">Calculate</Button>
                            </div>
                        </div>
                    </div>
                </form>


                <div className="flex flex-col gap-3 rounded-md shadow border">
                    <div className="border-b-2">
                        <div className="flex flex-row justify-between items-center px-2 py-4">
                            <Label>33% Cash Screening Benchmark  - RM {data?.total_cash} -</Label>
                        </div>
                    </div>



                    <div className="flex flex-row gap-2 p-2" >
                        <Input placeholder="Eg. Cash at Bank" />
                        <Input className="w-[100px]" placeholder="Amount" />
                        <Button variant={"outline"} size={"sm"} className="rounded-sm">
                            <Edit className="h-4 w-4" />
                        </Button>

                    </div>

                    <div className="flex flex-row gap-2 p-2" >
                        <Input placeholder="Eg. Deposit" />

                        <Input className="w-[100px]" placeholder="Amount" />
                        <Button variant={"outline"} size={"sm"} className="rounded-sm">
                            <Edit className="h-4 w-4" />
                        </Button>

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
                            <Label>33% Debt Screening Benchmark   - RM {data?.total_debt} -</Label>
                        </div>
                    </div>


                    <div className="flex flex-row gap-2 p-2 items-center" >


                        <Input type="number" className="w-full" placeholder="Current"
                            value={current}
                            onChange={(e) => setCurrent(Number(e.target.value))} />
                        <Button variant={"outline"} size={"sm"} className="rounded-sm">
                            <Edit className="h-4 w-4" />
                        </Button>

                    </div>

                    <div className="flex flex-row gap-2 p-2  item-center" >

                        <Input type="number" className="w-full" placeholder="Non current"
                            value={noncurrent}
                            onChange={(e) => setNonCurrent(Number(e.target.value))} />
                        <Button variant={"outline"} size={"sm"} className="rounded-sm">
                            <Edit className="h-4 w-4" />
                        </Button>

                    </div>

                    <div className="flex flex-row items-center justify-between p-2 border-t-2">
                        <Label>Total</Label>
                        <div className="flex items-center gap-2">
                            <Input className="w-[200px]" placeholder="Total" disabled />

                        </div>
                    </div>
                </div>

            </div>




            {
                !isPrint && (
                    <div className="flex flex-row items-center justify-end gap-2">

                        <Button variant={"secondary"} onClick={handlePrintChange}>
                            <Printer className="mr-2 h-4 w-4" />
                            Generate PDF
                        </Button>
                    </div>
                )
            }

            {
                isPrint && (
                    <div className="flex flex-row items-center justify-end gap-2">
                        <ReactToPrint trigger={
                            () => <div className="flex justify-end">
                                <Button variant={"secondary"} onClick={handlePrintChange}>
                                    <Printer className="mr-2 h-4 w-4" />
                                    Print PDF
                                </Button>
                            </div>
                        }
                            content={() => componentRef.current}
                        />

                    </div>
                )
            }


        </div>
    );




}

function BuildHeader() {
    return (
        <div className="border-b pb-5">
            <MainHeader title="Report Result" desc="Manage your annual report by fill in the blanks" />
        </div>
    )
}

function BuildForm({ onDelete, id, title }: BuildFormProps) {
    return (
        <div className="flex flex-row gap-2 p-2" key={id}>
            <Input placeholder={title} />
            <Input className="w-[100px]" placeholder="Amount" />
            <Button variant={"outline"} size={"sm"} className="rounded-sm">
                <Edit className="h-4 w-4" />
            </Button>
            <Button variant={"outline"} size={"sm"} onClick={onDelete}>
                <Minus className="h-4 w-4" />
            </Button>
        </div>
    )
}

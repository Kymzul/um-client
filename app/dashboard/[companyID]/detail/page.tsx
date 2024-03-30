'use client'

import { CardContent } from "@/app/components/card/dash-card"
import { MainHeader, MainHeaderProps } from "@/app/components/header/main-header"
import { HistoryDataTableDemo } from "@/app/components/table/history-table"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import exp from "constants"
import { ChevronLeft, Trash2, Upload } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { TCompany, listYear } from "@/types"
import Dropzone from "react-dropzone"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SubmitButton } from "@/app/components/button/submit-button"
import { DetailTable } from "@/app/components/table/detail-table"
import { getSingleCompany } from "@/app/action/company-action"
import { set } from "date-fns"



export const listDetail: CompanyDetail[] = [
    {
        companyYear: 2020,
        companyStatus: true
    },
    {
        companyYear: 2021,
        companyStatus: false
    },
    {
        companyYear: 2022,
        companyStatus: true
    }
]

export type CompanyDetail = {
    companyYear: number,
    companyStatus: boolean
}

export default function CompanyDetail({ params }: {
    params: {
        companyID: string
    }
}) {
    const [company, setCompany] = useState<TCompany | null>(null);
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)


    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/company/${params.companyID}`);
                if (response.ok) {
                    const data = await response.json();
                    setCompany(data);
                    setLoading(false);
                } else {
                    throw new Error("Failed to fetch company data");
                }
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };

        fetchCompanyData();
    }, [params.companyID]);

    const [file, setFile] = useState<File | null>(null);

    if (!company) {
        return (
            <div>Loading</div>
        )
    } else {
        return (
            <div className="flex flex-col w-full gap-5 p-8">
                <BuildMainHeader companyName={company?.companyName || ''} />
                <BuildTable companyID={params.companyID} />
                <BuildCompanyLatestFinancialReport />
                <BuildDropdownFinancial />
                <section className="flex flex-col gap-3">
                    <Label>Company Latest Financial Report</Label>
                    <Dropzone onDrop={acceptedFiles => {
                        setFile(acceptedFiles[0])
                        console.log(file?.name)
                    }}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()} className="flex flex-col justify-center items-center border gap-2 rounded-lg h-[200px]">
                                    <input {...getInputProps()} />
                                    <Upload />
                                    <p className="text-muted-foreground text-xs">Drag & drop annual report, or click the select files.</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>

                </section>

                {
                    file && (
                        <section className="flex flex-col gap-3">
                            <Label>Preview Report</Label>
                            <div className="flex flex-row items-center justify-between gap-2">
                                <Input value={file.name} disabled />
                                <Button variant={"ghost"} size={"icon"} onClick={() => {
                                    setFile(null);
                                }}>
                                    <Trash2 className="h-6 w-6 text-red-600" />
                                </Button>
                            </div>
                        </section>
                    )
                }
                <BuildBottom />
            </div>
        )
    }


}


function BuildMainHeader({ companyName }: {
    companyName: string
}) {
    return (
        <div className="border-b pb-5">
            <MainHeader title={companyName} desc="Here is overview for this company" />
        </div>
    )
}

function BuildTable({ companyID }: {
    companyID: string
}) {
    return (
        <DetailTable listDetail={listDetail} />
    )
}

function BuildCompanyLatestFinancialReport() {
    return (
        <div className="flex flex-col gap-3 border-b pb-4">
            <Label>Company Latest Financial Report</Label>
            <p className="text-xs text-gray-400 font-light">Automate shariah compliant evaluation by submitting latest financial report</p>
        </div>
    )
}

function BuildDropdownFinancial() {
    return (
        <section className="flex flex-col gap-3">
            <Label>Financial Report Year</Label>
            <Select >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                    {
                        listYear.map((eachLocation, index) => {
                            return (
                                <SelectItem key={index} value={eachLocation.toString()}>{eachLocation}</SelectItem>
                            )
                        })
                    }
                </SelectContent>
            </Select>
        </section>
    )
}

function BuildBottom() {
    return (
        <div className="flex flex-row justify-end gap-4">
            <Button variant={"secondary"} asChild>
                <Link href={'/dashboard/history'}>
                    Cancel
                </Link>
            </Button>
            <SubmitButton buttonTitle="Generate" buttonVariant={"default"} />
        </div>
    )
}
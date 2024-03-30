"use client"

import { validateCompany } from "@/app/action/company-action"
import { SubmitButton } from "@/app/components/button/submit-button"
import { Themetoggle } from "@/app/components/theme/toggle-theme"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Trash2, icons } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import React, { FormEvent, SyntheticEvent, useState } from "react"
import Dropzone from "react-dropzone"
import toast from "react-hot-toast"
import { useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { listLocation, listSector, listYear } from "@/types"
import { MainHeader } from "@/app/components/header/main-header"
import Router from "next/router"




export default function AnalyzePage() {
    const router = useRouter(); // Initialize useRouter hook
    const [file, setFile] = useState<File | null>(null);
    const [sector, setSector] = useState("");
    const [location, setLocation] = useState("");
    //
    const [companyName, setCompanyName] = useState("");
    const [companyPhoneNumber, setCompanyPhoneNumber] = useState("");
    const [companyPBA, setCompanyPBA] = useState("");
    const [companyFRY, setCompanyFRY] = useState("");

    async function handleClientPostCompany(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();


        if (!file) {
            toast.error('Please select a file')
        } else if (file.type !== 'application/pdf') {
            toast.error('File must in PDF Format')
        } else {
            const formData = new FormData();
            formData.append("file_upload", file!);
            const result = await validateCompany(formData);
            if (result.error == null) {
                //http://localhost:3000/dashboard/analyze
                const ratio_cash = result.ratio?.RatioCash;
                const ratio_debt = result.ratio?.RatioDebt;
                const title_revenue = result.title?.TitleRevenue;
                const title_pbt = result.title?.TitlePBT;
                const title_assets = result.title?.TitleAssets;
                const total_cash = result.total?.TotalCash;
                const total_debt = result.total?.TotalDebt;
                const current = result.debt?.Current;
                const non_current = result.debt?.NonCurrent;


                const companyData = {
                    companyName: companyName,
                    companyNumber: companyPhoneNumber,
                    companySector: sector,
                    companyLocation: location,
                    companyPBA: companyPBA,
                    companyFRY: companyFRY,
                    ratio_cash,
                    ratio_debt,
                    title_revenue,
                    title_pbt,
                    title_assets,
                    total_cash,
                    total_debt,
                    current, non_current
                };

                await fetch(`http://localhost:3000/api/company`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(companyData)
                });
                toast.success('Success Uploaded: ' + file?.name + result.message);
                router.push('/dashboard/result');

            } else {
                toast.error(result.error)
            }
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        setFile(file);
    }

    const handleSectorChange = (selectedSector: string) => {
        setSector(selectedSector);
        toast.success(selectedSector);
    }

    const handleLocationChange = (selectedLocation: string) => {
        setLocation(selectedLocation);
        toast.success(selectedLocation);
    }

    const handleYearChange = (selectedYear: string) => {
        setCompanyFRY(selectedYear);
        toast.success(selectedYear);
    }

    return (
        <div className="flex flex-col w-full gap-5 p-8">
            <BuildHeader />
            <form onSubmit={handleClientPostCompany} >
                <div className="flex flex-col gap-8">
                    <section className="flex flex-col gap-3">
                        <BuildFormLabel labelTitle="Company Name" />
                        <Input type="text" id="companyName" name="companyName" placeholder="Zetten Sdn Bhd" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
                        <p className="text-muted-foreground text-xs">This is the company name. Dont worry we will secure your company privacy.</p>
                    </section>

                    <section className="flex flex-col gap-3">
                        <BuildFormLabel labelTitle="Company Phone Number" />
                        <Input type="text" id="companyPhoneNumber" name="companyPhoneNumber" placeholder="012345678" value={companyPhoneNumber} onChange={(event) => setCompanyPhoneNumber(event.target.value)} />
                        <p className="text-muted-foreground text-xs">This is the company phone number. Dont worry we will secure your company privacy.</p>
                    </section>

                    <section className="flex flex-row items-center gap-4">
                        <section className="flex flex-col gap-3">
                            <BuildFormLabel labelTitle="Company Sector" />
                            <Select onValueChange={handleSectorChange} >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Company Sector" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        listSector.map((eachSector, index) => {
                                            return (
                                                <SelectItem key={index} value={eachSector.sectorValue}>{eachSector.sectorName}</SelectItem>
                                            )
                                        })
                                    }
                                </SelectContent>
                            </Select>
                        </section>

                        <section className="flex flex-col gap-3">
                            <BuildFormLabel labelTitle="Company Location" />
                            <Select onValueChange={handleLocationChange}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Company Location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        listLocation.map((eachLocation, index) => {
                                            return (
                                                <SelectItem key={index} value={eachLocation.locationValue}>{eachLocation.locationName}</SelectItem>
                                            )
                                        })
                                    }
                                </SelectContent>
                            </Select>
                        </section>
                    </section>

                    <section className="flex flex-col gap-3">
                        <BuildFormLabel labelTitle="Principle Business Acitivities" />
                        <Textarea placeholder=" Briefly explain the company services." name="companyBio" id="companyBio" value={companyPBA} onChange={(event) => setCompanyPBA(event.target.value)} ></Textarea>
                    </section>

                    <section className="flex flex-col gap-3">
                        <Label>Financial Report Year</Label>
                        <Select onValueChange={handleYearChange} >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Year" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    listYear.map((eachYear, index) => {
                                        return (
                                            <SelectItem key={index} value={eachYear.toString()}>{eachYear}</SelectItem>
                                        )
                                    })
                                }
                            </SelectContent>
                        </Select>
                    </section>

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
            </form>
        </div>
    )
}

function BuildHeader() {
    return (
        <div className="border-b pb-5">
            <MainHeader title="Enter Company Details" desc="Manage annual report by filling in the blanks." />
        </div>
    )
}

function BuildFormLabel({ labelTitle }: {
    labelTitle: string
}) {
    return (
        <div className="flex items-center">
            <Label>{labelTitle}</Label>
            <span className="text-red-600 ml-2">*</span>
        </div>
    )
}

function BuildBottom() {
    return (
        <div className="flex flex-row justify-end gap-4">
            <Button variant={"secondary"} asChild>
                <Link href={'/dashboard'}>
                    Cancel
                </Link>
            </Button>
            <SubmitButton buttonTitle="Generate" buttonVariant={"default"} />
        </div>
    )
}
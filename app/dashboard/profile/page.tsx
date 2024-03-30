'use client'

import { MainHeader } from "@/app/components/header/main-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { listLocation } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const [location, setLocation] = useState("");

    const handleLocationChange = (selectedLocation: string) => {
        setLocation(selectedLocation);
        toast.success(selectedLocation);
    }

    return (
        <div className="flex flex-col w-full p-8 gap-5">
            <BuildHeader />
            <div className="flex flex-col gap-5">
                <section className="flex flex-col gap-3">
                    <Label>Company / Organisation Home</Label>
                    <Input placeholder="Security Commission" />
                </section>
                <section className="flex flex-col gap-3">
                    <Label>Email</Label>
                    <Input placeholder="admin@gmail.com" />
                </section>
                <section className="flex flex-col gap-3">
                    <Label>License Number</Label>
                    <Input placeholder="A0011" />
                </section>

                <section className="flex flex-col gap-3">
                    <Label>Location</Label>

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

                <Button className="w-fit">
                    Save
                </Button>
            </div>

        </div >
    )
}

function BuildHeader() {
    return (
        <div className="border-b pb-5">
            <MainHeader title="License" desc="Personal Detail" />
        </div>
    )
}

function BuildFormLocation({ handleLocationChange }: {
    handleLocationChange: () => void
}) {
    return (
        <>
            <Label>Location</Label>

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
            </Select></>
    )
}
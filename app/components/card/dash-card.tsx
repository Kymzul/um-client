import { cn } from "@/lib/utils";
import React from "react";
import { CreditCard, LucideIcon } from "lucide-react";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";


export type DashboardCardProps = {
    label: string;
    content: string;
    desc: string;
    icon: LucideIcon
}

export default function DashboardCard({ dash }: { dash: DashboardCardProps }) {
    return <DashboardCardContent>

        <section className="flex justify-between items-center gap-2">
            <p className="text-sm">{dash.label}</p>
            <dash.icon className="h-5 w-5 text-gray-400" />
        </section>
        <section className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold">{dash.content}</h2>
            <p className="text-xs text-gray-500">{dash.desc}</p>
        </section>

    </DashboardCardContent>
}


export function DashboardCardContent(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div  {...props} className={
            cn("flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
                props.className)}
        />)
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div  {...props} className={
            cn("flex w-full flex-col gap-3 rounded-xl border p-4 shadow",
                props.className)}
        />)
}
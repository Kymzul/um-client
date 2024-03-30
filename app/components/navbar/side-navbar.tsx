"use client";

import { ArchiveX, Inbox, Send, File, LayoutDashboard, Notebook, User, Settings, ChevronRight, Folders, Info, Loader, Loader2 } from "lucide-react"
import { Nav } from "./nav"
import { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMediaQuery } from "@react-hook/media-query";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import path from "path";
type Props = {}

export default function SideNavBar({ }: Props) {
    const isMobile = useMediaQuery("(max-width: 639px)");
    const pathname = usePathname();
    const [isCollapsed, setCollapsed] = useState(false);


    function toggleSideBar() {
        console.log('press')
        setCollapsed(!isCollapsed);
    }

    useEffect(() => {
        if (!isMobile) {
            setCollapsed(false);
        }
    }, [isMobile])

    return (
        <div className={cn(`relative min-w-[80px] ${isCollapsed || isMobile ? "px-0" : "px-10"} pb-10 pt-10 border-r flex flex-col items-center`)}>

            {
                isMobile || isCollapsed ?
                    (
                        <Image src="/umlogo.png" alt="Shariah Viz Logo" width={50} height={50} priority />
                    )
                    :
                    (
                        <Image src="/umlogobig.png" alt="Shariah Viz Logo" width={200} height={100} priority />

                    )
            }
            <BuildButton toggleSideBar={toggleSideBar} />

            <div className="flex flex-col gap-4">
                <div className="border-b-2 pb-5">
                    <Nav
                        isCollapsed={isMobile ? true : isCollapsed}
                        links={[
                            {
                                title: "Dashboard",
                                label: "",
                                icon: LayoutDashboard,
                                variant: "default",
                                href: "/dashboard"
                            },
                            {
                                title: "History",
                                label: "",
                                icon: Folders,
                                variant: "ghost",
                                href: "/dashboard/history"
                            },
                            {
                                title: "Analyze Report",
                                label: "",
                                icon: File,
                                variant: "ghost",
                                href: "/dashboard/analyze"
                            },


                        ]}
                    />
                </div>

                <div className="border-b-2 pb-5">
                    <Nav
                        isCollapsed={isMobile ? true : isCollapsed}
                        links={
                            [
                                {
                                    title: "Help",
                                    label: "",
                                    icon: Info,
                                    variant: "default",
                                    href: "/"
                                },
                                {
                                    title: "Setting",
                                    label: "",
                                    icon: Settings,
                                    variant: "ghost",
                                    href: "/"
                                },
                            ]
                        }
                    />
                </div>


                <div className={cn(` ${'/dashboard/profile' === pathname ? "bg-primary" : "bg-background"} p-2 rounded-lg`)}>
                    <Link href={'/dashboard/profile'} >
                        <BuildUserNav isMobile={isMobile} isPath={'/dashboard/profile' === pathname} />
                    </Link>
                </div>
            </div>
        </div>
    )

}

function BuildButton({ toggleSideBar }: { toggleSideBar: () => void }) {
    return (
        <div className="absolute right-[-20px] top-7">
            <Button variant={"secondary"} size={"icon"} className="rounded-full p-2" onClick={toggleSideBar}>
                <ChevronRight />
            </Button>
        </div>
    )
}

function BuildUserNav({ isMobile, isPath }: {
    isMobile: boolean,
    isPath: boolean
}) {

    if (isMobile) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            </AvatarFallback>
                        </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add to library</p>
                    </TooltipContent>

                </Tooltip>
            </TooltipProvider>
        )
    } else {
        return (
            <BuildUserCard isPath={isPath} />
        )
    }
}

function BuildUserCard({ isPath }: {
    isPath: boolean
}) {
    return (
        <section className="flex flex-row items-center gap-2">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                    <Loader2 className="animate-spin" />
                </AvatarFallback>
            </Avatar>
            <section className={cn(`flex flex-col`, isPath ? 'text-white' : 'text-black')}>
                <p className="text-xs font-medium ">Haziq Hakimi</p>
                <p className="text-xs font-light">haziqhakimi@gmail.com</p>
            </section>
        </section>
    )
}
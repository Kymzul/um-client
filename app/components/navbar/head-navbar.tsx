'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Themetoggle } from "../theme/toggle-theme";



export function HeadNavbar() {
    //const isMobile = useMediaQuery("(max-width: 639px)");
    return (
        <nav className="border-b bg-background h-[10vh] flex items-center sticky top-0 ">
            <div className="container flex items-center justify-between">
                <Link href={'/'}>
                    <h1 className="font-bold text-3xl">CSC 3402</h1>
                </Link>
                <div className="flex items-center gap-x-2">
                    <Themetoggle />
                </div>
            </div>
        </nav>
    )
}


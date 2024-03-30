'use client'

import { Button } from "@/components/ui/button";
import { useState } from "react"
import AIDialog from "../dialog/ai-dialog";

export default function AIChatButton() {
    const [chatBoxOpen, setChatBoxOpen] = useState(false);
    return (
        <>
            <Button variant={"ghost"} className="flex" onClick={() => setChatBoxOpen(true)}>Ask AI</Button>
            <AIDialog isOpen={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
        </>
    )
}
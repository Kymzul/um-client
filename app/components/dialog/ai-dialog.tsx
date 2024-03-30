import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChat, Message } from "ai/react";
import { XCircle } from "lucide-react";


interface AIChatBoxProps {
    isOpen: boolean;
    onClose: ()
        => void
}

export default function AIDialog({ isOpen, onClose }: AIChatBoxProps) {

    const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading, error } = useChat();
    return (
        <div className={cn("bottom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36", isOpen ? "fixed" : "hidden")}>
            <button onClick={onClose} className="mb-1 ms-auto block">
                <XCircle />
            </button>

            <div className="flex flex-col h-[600px] rounded-lg bg-background shadow border">
                <div className="h-full">Messages</div>
                <form onSubmit={handleSubmit} className="flex m-3 gap-1 items-center">
                    <Input placeholder="Ask AI Here.." onChange={handleInputChange} value={input} />
                    <Button type="submit">Send</Button>
                </form>
            </div>
        </div>
    )
}
'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useChat, Message } from "ai/react";
import { Loader2, Send, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MainHeader } from "@/app/components/header/main-header";


export default function AIChatBoxPage({ params }: {
    params: {
        companyID: string
    }
}) {
    const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading, error } = useChat(
        {
            api: `/api/bot/${params.companyID}`
        }
    );
    return (
        <div className="flex flex-col w-full gap-5 p-8">

            <MainHeader title="Ask AI" desc="Ask AI that related for Company " />
            <div className="h-full">
                {
                    messages.map((chat: Message, index) => {
                        return (
                            <ChatCard chat={chat} />
                        )
                    })
                }
            </div>
            <form onSubmit={handleSubmit} className="flex flex-row items-center gap-4">
                <Input placeholder="Ask AI Here.." onChange={handleInputChange} value={input} />
                {
                    isLoading ?
                        (<Button className="w-fit">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Load
                        </Button>)
                        :
                        (
                            <Button className="w-fit">
                                <Send className="mr-2 h-4 w-4" />
                                Send
                            </Button>
                        )
                }
            </form>
        </div>
    )
}

function ChatCard({ chat: { role, content, id } }: {
    chat: Message;
},
) {
    const isUser = role === "user";
    return (

        <div className={cn(
            "mt-5 flex items-start",
            isUser ? "justify-end" : " justify-start"
        )}>

            {
                !isUser &&
                (
                    <Avatar className="mr-2 shrink-0">
                        <AvatarImage src={"https://github.com/shadcn.png"} />
                        <AvatarFallback>Src</AvatarFallback>
                    </Avatar>
                )
            }

            <div className={cn(
                "whitespace-pre-line rounded-sm border px-3 py-2 text-primary-foreground text-xs",
                isUser ? "bg-primary text-primary-foreground" : "bg-background text-accent-foreground"
            )}>
                {
                    content.split("\n").map((currentChat: string, index: number) => {
                        if (currentChat === "") {
                            return (
                                <p key={id + index}>&nbsp;</p>
                            )
                        } else {
                            return <p key={id + index}>{currentChat}</p>
                        }
                    })
                }
            </div>

            {
                isUser &&
                (
                    <Avatar className="ml-2 ">
                        <AvatarImage src={"https://github.com/shadcn.png"} />
                        <AvatarFallback>Src</AvatarFallback>
                    </Avatar>
                )

            }
        </div>

    )
}
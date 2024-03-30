import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export function SuggestSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="default">Suggestion</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Suggestion</SheetTitle>
                    <SheetDescription>
                        <section className="flex flex-col gap-4">
                            <p> You may contact the person in charge for clarification.</p>
                            <section>
                                <p>Company Name: Zetten Sdn Bhd</p>
                                <p>Contact Number: 01128315184</p>
                            </section>
                        </section>
                    </SheetDescription>
                </SheetHeader>


            </SheetContent>
        </Sheet>
    )
}

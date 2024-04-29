"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@ui/lib/utils"
import { Button } from "@ui/components/ui/button"
import { Calendar } from "@ui/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@ui/components/ui/popover"

export function DatePicker({ pickDate, setCurrentDate, dateFormat = "dd/MM/yyyy"  }: { pickDate: any, setCurrentDate: any, dateFormat?: string}) {
    const [date, setDate] = React.useState(pickDate)

    const handleChange = (value: any) => {
        setDate(value)
        setCurrentDate(format(value, dateFormat))
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[130px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, dateFormat) : <span>Selecione uma data</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleChange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

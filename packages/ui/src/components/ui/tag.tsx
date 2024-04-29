import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@ui/lib/utils"

const tagVariants = cva(
    "border rounded-xl flex justify-center items-center text-white w-[90px]",
    {
        variants: {
            variant: {
                success: "bg-green-300",
                pending:
                    "bg-orange-300",
                fail:
                    "bg-red-300",
            },
        },
        defaultVariants: {
            variant: "success",
        },
    }
)

type Tag = {
    label: string,
    variant: "success" | "pending" | "fail",
    className?: string
}

const Tag = ({ label, variant, className }: Tag) => {
    return (
        <div className={cn(tagVariants({ variant, className }))}>
            {label}
        </div>
    )
}

export default Tag;
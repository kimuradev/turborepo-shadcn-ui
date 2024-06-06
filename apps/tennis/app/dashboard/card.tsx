'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/ui/card"
import { type DashboardCardProps } from "@/lib/definitions"

export default function DashboardCard({ title, description, className, children, footer }: DashboardCardProps) {
    return (
        <Card className={className}>
            <CardHeader className="gap-2">
                <CardTitle>{title}</CardTitle>

                {description && (
                    <CardDescription>
                        {description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className={`flex justify-center flex-1`} >
                {children}
            </CardContent>
            <CardFooter className="p-6">
                {footer}
            </CardFooter>
        </Card>
    )
}
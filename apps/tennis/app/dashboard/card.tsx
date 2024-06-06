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

export default function DashboardCard({ title, description, contentClass, className, children, footer }: DashboardCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>

                {description && (
                    <CardDescription>
                        {description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className={`flex justify-center flex-1 ${contentClass}`} >
                {children}
            </CardContent>
            {footer && (
                <CardFooter className="p-6">
                    {footer}
                </CardFooter>
            )}
        </Card>
    )
}
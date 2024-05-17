'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/ui/card"
import { type DashboardCardProps } from "@/lib/definitions"

export default function DashboardCard({ title, description, className, children }: DashboardCardProps) {
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
            <CardContent className={`flex justify-center flex-1`} >
                {children}
            </CardContent>
        </Card>
    )
}
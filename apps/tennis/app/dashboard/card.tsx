'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { type DashboardCardProps } from "@/lib/definitions"
import { useAuthContext } from "../context/auth-context"
import TournamentModal from "./current-tournament/tournament-modal"

export default function DashboardCard({ title, description, className, isEditable, children }: DashboardCardProps) {
    const { signed, isAdmin } = useAuthContext();

    return (
        <Card className={className}>
            <CardHeader>
                {signed && isAdmin && isEditable && (
                    <div className="flex justify-end relative">
                        <TournamentModal />
                    </div>
                )}

                <CardTitle>{title}</CardTitle>

                {description && (
                    <CardDescription>
                        {description}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="flex justify-center flex-1 pl-2">
                {children}
            </CardContent>
        </Card>
    )
}
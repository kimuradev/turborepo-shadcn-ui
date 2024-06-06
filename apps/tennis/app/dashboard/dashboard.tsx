import { Suspense } from "react"
import { BarChartSkeleton, CardSkeleton, GameScheduleSkeleton, RankingLeaderSkeleton } from "@/components/skeletons"

import MonthlyGames from "./monthly-games"
import DashboardCard from "./card"
import RankingLeader from "./ranking-leader"
import CurrentTournament from "./current-tournament"
import GameScheduled from "./game-scheduled"
import Link from "next/link"
import { Pin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/ui/card"
import Notes from "./notes"

export default function Dashboard() {
    return (
        <>
            <div>
                <Notes />
                {/* <Card className="bg-yellow-200/20 relative">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-normal flex items-center gap-2">
                            <Pin className="w-4 h-4 fill-red-500" />
                            <span className="font-semibold leading-none tracking-tight">Mural de recados</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-6">
                        <Notes />
                    </CardContent>
                </Card> */}
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
                    <DashboardCard title="Torneio ativo" className="relative">
                        <Suspense fallback={<CardSkeleton />}>
                            <CurrentTournament />
                        </Suspense>
                    </DashboardCard>
                    <DashboardCard title="Jogos da rodada" className="relative">
                        <Suspense fallback={<GameScheduleSkeleton />}>
                            <GameScheduled />
                        </Suspense>
                    </DashboardCard>
                    <DashboardCard
                        title="Líderes do ranking"
                        description={`Top 10 - Geral`}
                        footer={
                            <Link href='/ranking' className="text-primary">Ver ranking completo</Link>
                        }>
                        <Suspense fallback={<RankingLeaderSkeleton />}>
                            <RankingLeader />
                        </Suspense>
                    </DashboardCard>
                    <DashboardCard title="Jogos realizados/mês" className="flex flex-col p-0" >
                        <Suspense fallback={<BarChartSkeleton />}>
                            <MonthlyGames />
                        </Suspense>
                    </DashboardCard>
                </div >
            </div >
        </>

    )
}
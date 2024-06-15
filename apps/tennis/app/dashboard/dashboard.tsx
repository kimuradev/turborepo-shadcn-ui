import { Suspense } from "react"
import { BarChartSkeleton, CardSkeleton, GameScheduleSkeleton, RankingLeaderSkeleton } from "@/components/skeletons"

import MonthlyGames from "./monthly-games"
import DashboardCard from "./card"
import RankingLeader from "./ranking-leader"
import CurrentTournament from "./current-tournament"
import GameScheduled from "./game-scheduled"
import Link from "next/link"
import Notes from "./notes"
import TournamentSubscription from "./tournament-subscription"

export default function Dashboard() {
    return (
        <>
            <div>
                <Notes />
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
                    <DashboardCard
                        title="Torneio com inscrição aberta"
                        description="Período de inscrição: 14/06 à 23/06"
                        className="relative">
                        <Suspense fallback={<CardSkeleton />}>
                            <TournamentSubscription />
                        </Suspense>
                    </DashboardCard>
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
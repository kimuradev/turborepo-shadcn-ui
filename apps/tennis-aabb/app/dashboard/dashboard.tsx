import { Suspense } from "react"
import { BarChartSkeleton, CardSkeleton, DashboardCardSkeleton, GameScheduleSkeleton, RankingLeaderSkeleton } from "@/components/skeletons"

import MonthlyGames from "./monthly-games"
import DashboardCard from "./card"
import RankingLeader from "./ranking-leader"
import CurrentTournament from "./current-tournament"
import GameScheduled from "./game-scheduled"
import Link from "next/link"
import Notes from "./notes"
import Subscription from "./tournament-subscription"
import { IS_TRIAL_MODE } from "@/lib/constants"

export default function Dashboard() {
    return (
        <>
            <div>
                <Notes />
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
                    <Suspense fallback={<DashboardCardSkeleton />}>
                        <Subscription />
                    </Suspense>
                    <DashboardCard title="Torneio ativo" className="relative flex flex-col"
                        footer={<Link href={`/players/subscribed?tournamentId=aabb&year=2024`} className="text-primary cursor-pointer">Ver inscritos</Link>}>
                        <Suspense fallback={<CardSkeleton />}>
                            <CurrentTournament />
                        </Suspense>
                    </DashboardCard>
                    <DashboardCard title="Jogos da rodada" className="relative flex flex-col">
                        <Suspense fallback={<GameScheduleSkeleton />}>
                            <GameScheduled />
                        </Suspense>
                    </DashboardCard>
                    {/* <DashboardCard
                        title="Líderes do ranking"
                        description={`Top 10 - Geral`}
                        className={`${IS_TRIAL_MODE ? 'opacity-50 cursor-default' : ''}`}
                        footer={
                            <>
                                {IS_TRIAL_MODE ? (<Link href='#' className="text-primary cursor-default">Ver ranking completo</Link>) : (<Link href='/ranking' className="text-primary">Ver ranking completo</Link>)}
                            </>
                        }>
                        <Suspense fallback={<RankingLeaderSkeleton />}>
                            <RankingLeader />
                        </Suspense>
                    </DashboardCard> */}
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
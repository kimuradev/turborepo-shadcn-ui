import MonthlyGames from "./monthly-games"
import DashboardCard from "./card"
import RankingLeader from "./ranking-leader"
import CurrentTournament from "./current-tournament"
import GameScheduled from "./game-scheduled"
import Spinner from "@ui/components/ui/spinner"
import { Suspense } from "react"

const Loading = () => <div className="flex justify-center"><Spinner /></div>

export default function Dashboard() {
    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <div >
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
                    <DashboardCard title="Torneio ativo" className="relative">
                        <Suspense fallback={<Loading />}>
                            <CurrentTournament />
                        </Suspense>
                    </DashboardCard>
                    <DashboardCard title="Jogos da rodada" className="relative">
                        <Suspense fallback={<Loading />}>
                            <GameScheduled />
                        </Suspense>
                    </DashboardCard>
                    <DashboardCard title="Líderes do ranking" description={`Top 10 - Geral`}>
                        {/* className="flex flex-col md:col-start-2 md:row-start-1 md:row-end-3"> */}
                        <Suspense fallback={<Loading />}>
                            <RankingLeader />
                        </Suspense>
                    </DashboardCard>
                    <DashboardCard title="Jogos realizados/mês" className="flex flex-col p-0" >
                        <Suspense fallback={<Loading />}>
                            <MonthlyGames />
                        </Suspense>
                    </DashboardCard>
                </div >
            </div >
        </>

    )
}
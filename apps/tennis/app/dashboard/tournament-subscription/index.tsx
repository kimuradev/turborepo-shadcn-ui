import { getApi } from "@/lib/fetch";
import DashboardCard from "../card";
import TournamentSubscription from "./tournament-subscription";
import EmptySubscription from "./empty-subscription";

export default async function Subscription() {
    const data = await getApi('/tournaments/subscription-open', { cache: 'no-store' });

    if (!data.length) {
        return (
            <>
                <EmptySubscription />
            </>
        )
    }

    return (
        <DashboardCard
            title="Torneio com inscrição aberta"
            description="Período de inscrição: 14/06 à 23/06"
            className="relative">
            <div className="flex flex-col md:flex-row gap-2">
                <TournamentSubscription data={data} />
            </div>
        </DashboardCard>

    )
}

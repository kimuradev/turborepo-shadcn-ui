import { getApi } from "@/lib/fetch";
import DashboardCard from "../card";
import TournamentSubscription from "./tournament-subscription";
import EmptySubscription from "./empty-subscription";

export default async function Subscription() {
    const data = await getApi('/tournaments/subscription-open');

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
            description={`Período de inscrição: ${data[0].period}`}
            className="relative">
            <div className="flex flex-col md:flex-row gap-2">
                <TournamentSubscription data={data} />
            </div>
        </DashboardCard>

    )
}
import { getApi } from "@/lib/fetch";
import TournamentCard from "../current-tournament/tournament-card";

export default async function TournamentSubscription() {
    const data = await getApi('/tournaments/subscription-open', { cache: 'no-store' });

    return (
        <>
            <TournamentCard data={data} />
        </>
    )
}

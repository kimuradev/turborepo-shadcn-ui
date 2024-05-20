import { getApi } from "@/lib/fetch";
import TournamentCard from "./tournament-card";
import TournamentModal from "./tournament-modal";

export default async function CurrentTournament() {
    const data = await getApi('/tournaments/active', { cache: 'no-store' });

    return (
        <>
            <TournamentModal />
            <TournamentCard data={data} />
        </>
    )
}

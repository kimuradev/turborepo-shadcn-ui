import { getApi } from "@/lib/fetch";
import TournamentSubscriptions from "./tournament-subscriptions";
import { TOURNAMENT_DICTIONARY } from "@/lib/constants";

export default async function Page({ searchParams }: { searchParams: any }) {

    const { tournamentId, year } = searchParams;

    const data = await getApi(`/players/subscribed-tournament?tournamentId=${tournamentId}&year=${year}`);

    return (
        <>
            <h2 className="font-bold text-lg mb-1">Torneio: {TOURNAMENT_DICTIONARY.find(item => item.id === tournamentId)?.value} - {year}</h2>
            <TournamentSubscriptions data={data.filter((item: any) => item.player_name)} />
        </>
    )
}
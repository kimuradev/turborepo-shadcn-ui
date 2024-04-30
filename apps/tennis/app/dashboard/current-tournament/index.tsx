import { Frown } from "lucide-react";

import { TOURNAMENTS } from "@/lib/constants";
import { getApi } from "@/lib/fetch";
import TournamentCard from "./tournament-card";

export default async function CurrentTournament() {
    const response = await getApi('/tournaments/active', { cache: 'no-store' });

    const tournamentIndex = await TOURNAMENTS.findIndex((tournament: any) =>  {
        return tournament.value === response?.key;
    })

    if (tournamentIndex == -1) {
        return (
            <div className="flex flex-col justify-center items-center mt-6">
                <Frown className="w-[50px] h-[50px] stroke-primary mb-4" />
                <p className="text-sm text-muted-foreground">Nenhum torneio ativo no momento. </p>
            </div>
        )
    }

    return (
       <TournamentCard data={response} tournamentIndex={tournamentIndex} />
    )
}

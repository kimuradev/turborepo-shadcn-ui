import { getApi } from "@/lib/fetch";
import TournamentCard from "./tournament-card";
import TournamentModal from "./tournament-modal";
import { Frown } from "lucide-react";

export default async function CurrentTournament() {
    const data = await getApi('/tournaments/active', { cache: 'no-store' });

    if (!data.length) {
        return (
            <div className="flex flex-col justify-center items-center mt-6">
                <TournamentModal />
                <Frown className="w-[50px] h-[50px] stroke-primary mb-4" />
                <p className="text-sm text-muted-foreground">Nenhum torneio ativo no momento. </p>
            </div>
        )
    }

    return (
        <>
            <TournamentModal />
            <TournamentCard data={data}/>
        </>
    )
}

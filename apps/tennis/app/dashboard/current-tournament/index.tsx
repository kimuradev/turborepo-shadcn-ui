'use client'

import { useEffect, useState } from "react";
import { Frown } from "lucide-react";

import Spinner from "@ui/components/ui/spinner";
import { TOURNAMENTS } from "@/lib/constants";
import { getApi } from "@/lib/fetch";
import { useAuthContext } from "@/app/context/auth-context";
import TournamentCard from "./tournament-card";
import TournamentModal from "./tournament-modal";

export default function CurrentTournament() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true)
    const { signed, isAdmin } = useAuthContext();

    useEffect(() => {
        setIsLoading(true)

        const fetchData = async () => {
            try {
                const response = await getApi('/tournaments/active', { cache: 'no-store' });
                setData(response);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])


    const tournamentIndex = TOURNAMENTS.findIndex((tournament: any) => {
        return tournament.value === data?.key;
    })

    if (isLoading) {
        return <div className="flex justify-center"><Spinner /></div>
    }

    if (tournamentIndex == -1) {
        return (
            <div className="flex flex-col justify-center items-center mt-6">
                <Frown className="w-[50px] h-[50px] stroke-primary mb-4" />
                <p className="text-sm text-muted-foreground">Nenhum torneio ativo no momento. </p>
            </div>
        )
    }

    return (
        <>
            {signed && isAdmin && (
                <TournamentModal />
            )}
            <TournamentCard data={data} tournamentIndex={tournamentIndex} />
        </>
    )
}

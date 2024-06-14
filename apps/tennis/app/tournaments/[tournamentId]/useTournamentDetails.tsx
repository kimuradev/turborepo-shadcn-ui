import { useEffect, useState } from "react";

import useToastMessage from "@repo/ui/components/hooks/useToastMessage";
import { getApi } from "@/lib/fetch";

export function useTournamentDetails({ year, tournament }: any) {
    const [isLoading, setIsLoading] = useState(false);
    const [tournamentType, setTournamentType] = useState('');
    const { errorMessage } = useToastMessage();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await getApi(`/tournaments/type?year=${year}&tournament=${tournament}`);
                const { tournamentType } = response
                setTournamentType(tournamentType);
            } catch (err) {
                errorMessage();
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [tournament])

    return [{ isLoading, tournamentType }, {}]
}
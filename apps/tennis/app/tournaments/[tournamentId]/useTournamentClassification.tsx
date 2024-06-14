import { useEffect, useState } from "react";

import { useAppContext } from "@/app/context/app-context";
import useToastMessage from "@repo/ui/components/hooks/useToastMessage";
import { getApi } from "@/lib/fetch";

export function useTournamentClassification({ year, tournament, classId = '1'}: any) {
    const [isLoading, setIsLoading] = useState(false);
    const { games, setGames } = useAppContext();
    const { errorMessage } = useToastMessage();

    useEffect(() => {
        setIsLoading(true)

        const fetchData = async () => {
            try {
                const response = await getApi(`/games?year=${year}&tournament=${tournament}&classId=${classId}`);
                setGames(response);
            } catch (err) {
                errorMessage();
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])
    
    const handleClickTab = async (value: string) => {
        setIsLoading(true);
        try {
            const response = await getApi(`/games?year=${year}&tournament=${tournament}&classId=${value}`);
            setGames(response);
        } catch (err) {
            errorMessage();
        } finally {
            setIsLoading(false);
        }
    }

    return [{ games, isLoading },{ handleClickTab }]
}
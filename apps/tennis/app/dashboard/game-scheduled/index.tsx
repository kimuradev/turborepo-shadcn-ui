'use client'

import { useEffect, useState } from "react";
import { CalendarX } from "lucide-react";

import Spinner from "@ui/components/ui/spinner";
import { getApi } from "@/lib/fetch";
import GameTable from "./game-table";

export default function GameScheduled() {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
    
        const fetchData = async () => {
            try {
                const response = await getApi('/games/schedule', { cache: 'no-store' });
                setData(response);
            }  finally {
                setIsLoading(false);
            }
        }
    
        fetchData();
    }, [])


    if (isLoading) {
        return <div className="flex justify-center"><Spinner /></div>
    }

    if (!data.length) {
        return (
            <div className="flex flex-col justify-center items-center mt-6">
                <CalendarX className="w-[50px] h-[50px] stroke-primary mb-4" />
                <p className="text-sm text-muted-foreground">Nenhum jogo marcado no momento. </p>
            </div>
        )
    }

    return (
       <GameTable data={data} />
    )
}

"use client"

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import useToastMessage from "@/components/hooks/useToastMessage";

import { RANKING_TAB } from "@/lib/constants";
import { getApi } from "@/lib/fetch";
import { Ranking } from "./table/columns";
import RankingList from "./ranking-list";

const DEFAULT_RANKING = RANKING_TAB
const rankingTabs = [
    { id: 'general', name: 'Geral' },
    { id: 'yearly', name: 'Detalhado' },
]

export default function RankingTabs() {
    const [data, setData] = useState<Ranking[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState(DEFAULT_RANKING);

    const { errorMessage } = useToastMessage();

    useEffect(() => {
        setIsLoading(true)

        const fetchData = async () => {
            try {
                const response = await getApi('/ranking-leader');
                setData(response);
            } catch (err) {
                errorMessage();
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])

    const handleClickTab = async (value: string) => {
        const url = value === RANKING_TAB ? '/ranking-leader' : '/ranking'
        setType(value);
        setIsLoading(true)
        try {
            const response = await getApi(url);
            setData(response);
        } catch (err) {
            errorMessage();
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Tabs defaultValue={DEFAULT_RANKING} >
            <TabsList>
                {rankingTabs.map((c: any) => (
                    <TabsTrigger key={c.id} value={c.id.toString()} onClick={() => handleClickTab(c.id)}>{c.name}</TabsTrigger>
                ))}
            </TabsList>

            {rankingTabs.map((c: any) => (
                <TabsContent key={c.id} value={c.id.toString()}>
                    <RankingList data={data} type={type} isLoading={isLoading} />
                </TabsContent>
            ))}
        </Tabs>
    )
}
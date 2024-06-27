"use client"

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import useToastMessage from "@repo/ui/components/hooks/useToastMessage";

import { RANKING_TAB_GENERAL, RANKING_TAB_WTA } from "@/lib/constants";
import { getApi } from "@/lib/fetch";
import { Ranking } from "./table/columns";
import RankingList from "./ranking-list";
import { columns } from "./table/columns"
import { columns as generalColumns } from "./table/columns-general"

const rankingTabs = [
    { id: 'general', name: 'Geral' },
    { id: 'wta', name: 'WTA' },
    { id: 'yearly', name: 'Detalhado' },
]


const input = {
    input: {
        columnId: 'player_name',
        placeholder: 'Procurar jogador...'
    }
};

const select = {
    select: {
        columnId: 'year',
        placeholder: 'Ano...',
        defaultValue: new Date().getFullYear().toString(),
        options: [
            { value: '2024', label: '2024' },
            { value: '2025', label: '2025' }
        ]
    }
}

export default function RankingTabs() {
    const [data, setData] = useState<Ranking[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [tableData, setTableData] = useState({
        columnType: generalColumns,
        filterType: [{ ...input }]
    })

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

    const getUrl = (value: string) => {
        switch (value) {
            case RANKING_TAB_GENERAL:
                return '/ranking-leader'
            case RANKING_TAB_WTA:
                return '/ranking-leader-wta'
            default:
                return '/ranking'
        }
    }

    const getColumnType = (value: string) => {
        switch (value) {
            case RANKING_TAB_GENERAL:
                return generalColumns
            case RANKING_TAB_WTA:
                return generalColumns
            default:
                return columns
        }
    }

    const getFilterType = (value: string) => {
        switch (value) {
            case RANKING_TAB_GENERAL:
                return [
                    { ...input },
                ]
            case RANKING_TAB_WTA:
                return [
                    { ...input },
                ]
            default:
                return [
                    { ...input },
                    { ...select }
                ]
        }
    }

    const handleDataTable = (value: string) => {
        const columnType: any = getColumnType(value);
        const filterType: any = getFilterType(value)

        setTableData((state) => ({
            ...state,
            columnType,
            filterType
        }))

    }

    const handleClickTab = async (value: string) => {
        setIsLoading(true)
        handleDataTable(value);

        const url = getUrl(value);

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
        <Tabs defaultValue={RANKING_TAB_GENERAL} >
            <TabsList>
                {rankingTabs.map((c: { id: string, name: string }) => (
                    <TabsTrigger key={c.id} value={c.id.toString()} onClick={() => handleClickTab(c.id)}>{c.name}</TabsTrigger>
                ))}
            </TabsList>

            {rankingTabs.map((c: { id: string }) => (
                <TabsContent key={c.id} value={c.id.toString()}>
                    <RankingList data={data} columnType={tableData.columnType} filterType={tableData.filterType} isLoading={isLoading} />
                </TabsContent>
            ))}
        </Tabs>
    )
}
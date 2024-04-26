"use client"

import { RANKING_TAB } from "@tennis/lib/constants";
import { columns } from "./table/columns"
import { columns as generalColumns } from "./table/columns-general"
import { DataTable } from "@repo/ui/components/table/data-table";

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


export default function RankingList({ data, type, isLoading }: { data: any, type: string, isLoading: boolean }) {
    const columnType: any = type === RANKING_TAB ? generalColumns : columns;

    const filterType: any = type === RANKING_TAB ? [
        { ...input },
    ] : [
        { ...input },
        { ...select }
    ]

    return (
        <div className="container mx-auto p-0">
            <DataTable columns={columnType} data={data} filtering={filterType} isLoading={isLoading} />
        </div>
    )
}


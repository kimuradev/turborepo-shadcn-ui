"use client"

import { DataTable } from "@repo/ui/components/table/data-table";
import { useYearlyTable } from "./table/useYearlyTable";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/ui/select"
import { YEARS } from '@/lib/constants';
import { useState } from "react";

const filterType = [
    {
        input: {
            columnId: 'player_name',
            placeholder: 'Procurar jogador...'
        }
    }
]

export default function FinanceYearly() {
    const [year, setYear] = useState('2024');
    // @ts-ignore
    const [{ data, isLoading, columns }] = useYearlyTable({ year });

    return (
        <div className="container mx-auto p-0 w-[700px]">

            <div className="flex flex-col gap-1.5 mb-8 ">
                <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Selecione o ano:</p>
                <Select onValueChange={value => setYear(value)} value={year}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Ano..." />
                    </SelectTrigger>
                    <SelectContent >
                        {[...YEARS].map((year: string) => (
                            <SelectItem key={year} value={year} >{year}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {year && (
                <DataTable columns={columns} data={data} filtering={filterType} isLoading={isLoading} />
            )}
        </div>
    )
}


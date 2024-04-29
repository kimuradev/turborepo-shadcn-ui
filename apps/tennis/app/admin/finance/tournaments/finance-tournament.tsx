"use client"

import { DataTable } from "@repo/ui/components/table/data-table";
import { useTournamentTable } from "./table/useTournamentTable";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/ui/select"
import { TOURNAMENT_DICTIONARY, YEARS } from '@/lib/constants';
import { useState } from "react";
import { Separator } from "@repo/ui/components/ui/separator";

const filterType = [
    {
        input: {
            columnId: 'player_name',
            placeholder: 'Procurar jogador...'
        },
    }
]

export default function FinanceTournament() {
    const [tournamentId, setTournamentId] = useState('');
    const [year, setYear] = useState('');
    // @ts-ignore
    const [{ data, isLoading, columns },] = useTournamentTable({ tournamentId, year });

    return (
        <div className="container mx-auto p-0 w-[700px]">
            <div className="flex justify-between gap-4">
                <div className="flex flex-col gap-1.5 mb-8 ">
                    <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Selecione o torneio:</p>
                    <Select onValueChange={value => setTournamentId(value)}>
                        <SelectTrigger className="w-[180px]" value={tournamentId}>
                            <SelectValue placeholder="Torneio..." />
                        </SelectTrigger>
                        <SelectContent >
                            {[...TOURNAMENT_DICTIONARY].map((tournament: any) => (
                                <SelectItem key={tournament.id} value={tournament.id} >{tournament.value}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-center items-center flex-1">
                    <Separator />
                </div>
                
                <div className="flex flex-col gap-1.5 mb-8 ">
                    <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Selecione o ano:</p>
                    <Select onValueChange={value => setYear(value)} value={year}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Ano..." />
                        </SelectTrigger>
                        <SelectContent >
                            {[...YEARS].map((year: any) => (
                                <SelectItem key={year} value={year} >{year}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {tournamentId && year && (
                <DataTable columns={columns} data={data} filtering={filterType} isLoading={isLoading} />
            )}
        </div>
    )
}


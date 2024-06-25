"use client"

import { useEffect, useState } from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/ui/select"
import { TOURNAMENTS, YEARS } from '@/lib/constants';
import { getApi } from '@/lib/fetch';
import Spinner from '@repo/ui/components/ui/spinner';
import useToastMessage from '@repo/ui/components/hooks/useToastMessage';
import CardTournament from './card';

export default function Page() {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [year, setYear] = useState('')
    const { errorMessage } = useToastMessage()

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getApi('/tournaments');

                const tournamentData: any = TOURNAMENTS.map(t => {
                    const tournament = response.find((r: { key: string }) => r.key === t.value);
                    return {
                        ...t,
                        ...tournament
                    }
                })

                setData(tournamentData);
            } catch (err) {
                errorMessage();
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])

    const handleSelectChange = (value: string) => {
        setYear(value);
    }

    return (
        <div>
            <h2 className="font-bold text-lg mb-10">Torneios</h2>

            {isLoading ? (<Spinner />) : (
                <>
                    <div className="flex flex-col gap-1.5 mb-8 ">
                        <p className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Selecione o ano do torneio:</p>
                        <Select onValueChange={handleSelectChange} value={year}>
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
                        <div className='flex flex-wrap gap-6 justify-center items-center'>
                            {data?.map((t: any) => (
                                <CardTournament
                                    key={t.id}
                                    id={t.id}
                                    title={t.name}
                                    subtitle={t.description}
                                    headerSrcImg={t.headerSrcImg}
                                    contentSrcImg={t.contentSrcImg}
                                    bgColor={t.bgColor}
                                    link={t.link}
                                    started={t.started}
                                    tournamentId={t.value}
                                    year={year}
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
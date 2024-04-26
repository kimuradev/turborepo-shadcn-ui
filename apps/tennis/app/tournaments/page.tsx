"use client"

import { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/ui/select"
import { TOURNAMENTS, YEARS } from '@tennis/lib/constants';
import { getApi } from '@tennis/lib/fetch';
import Spinner from '@repo/ui/components/ui/spinner';
import useToastMessage from '@tennis/components/hooks/useToastMessage';
import CardTournament from './card';
import { useAuthContext } from '../context/auth-context';

export default function Page() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSubscribeLoading, setIsSubscribeLoading] = useState(false)
    const [subscription, setSubscription] = useState<any>(false);
    const [data, setData] = useState([])
    const [year, setYear] = useState('')
    const { errorMessage } = useToastMessage()
    const { profile } = useAuthContext()

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await getApi('/tournaments');

                const tournamentData: any = TOURNAMENTS.map(t => {
                    const tournament = response.find((r: any) => r.key === t.value);
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

    const fetchSubscription = async () => {
        const tournamentActive: any = data.find((t : any) => t.active);
        setIsSubscribeLoading(true);

        try {
            const response = await getApi(`/tournaments/subscribe/${profile.id}?year=${year}&tournament=${tournamentActive?.key}`);
            setSubscription(response);
        } catch (err) {
            setSubscription(false)
        } finally {
            setIsSubscribeLoading(false);
        }
    }

    useEffect(() => {
        if (isEmpty(profile)) {
            setSubscription(false)
        } else if (isEmpty(year)) {
            return;
        } else {
            fetchSubscription();
        }
    }, [profile, year])

    const handleSelectChange = (value: any) => {
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
                                {[...YEARS].map((year: any) => (
                                    <SelectItem key={year} value={year} >{year}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {isSubscribeLoading ? (<Spinner />) : (
                        <>
                            {year && !isSubscribeLoading && (
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
                                            year={t.year}
                                            subscriptionIsOpen={t.year == year && t.active}
                                            started={t.started}
                                            subscription={subscription}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}
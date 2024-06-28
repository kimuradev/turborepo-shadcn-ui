"use client"

import { useEffect, useState } from "react";
import isEmpty from 'lodash/isEmpty'

import { useAuthContext } from "@/app/context/auth-context";
import { TOURNAMENTS, WTA } from "@/lib/constants";
import { getApi } from "@/lib/fetch";
import { CardSkeleton } from "@/components/skeletons";
import CardTournament from "./card";

function TournamentCard({ data }: any) {
    const [currentTournament, setCurrentTournament] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false);
    const { profile, isAdmin } = useAuthContext();

    const fetchData = async () => {
        try {
            setIsLoading(true)
            if (isEmpty(profile) || isAdmin) {
                setCurrentTournament(data);
                return;
            }

            if (!isEmpty(profile) && profile.category === WTA) {
                await getTournamentSubscription(data);
            } else {
                await getTournamentSubscription(data.filter((item: any) => !item.key.includes(WTA)))
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, [profile])

    useEffect(() => {
        fetchData();
    }, [])

    const getTournamentSubscription = async (data: any) => {
        if (profile.id) {
            const updatedSubscriptions = await Promise.all(data.map(async (item: any) => {
                const response = await getApi(`/tournaments/subscribe/${profile.id}?year=${item.year}&tournament=${item.key}`, { cache: 'no-store' });

                if (!response) {
                    return { ...item, isSubscribed: false, paymentStatus: response?.payment_status }
                }
                return { ...item, isSubscribed: true, paymentStatus: response?.payment_status};
            }));

            setCurrentTournament(updatedSubscriptions)
        }
    }

    const getTournamentIndex = (tournamentKey: string) => {
        const tournamentIndex = TOURNAMENTS.findIndex((tournament: any) => {
            return tournament.value === tournamentKey
        })
        return tournamentIndex
    }

    if (isLoading) {
        return <CardSkeleton />
    }

    return (
        <div className="pl-4">
            <div className='flex flex-wrap gap-6 justify-center items-center'>
                {currentTournament.map((item: any) => (
                    <CardTournament
                        key={item.id}
                        id={item.id}
                        title={item.name}
                        subtitle={item.description}
                        headerSrcImg={TOURNAMENTS[getTournamentIndex(item.key)]?.headerSrcImg || ''}
                        contentSrcImg={TOURNAMENTS[getTournamentIndex(item.key)]?.contentSrcImg || { src: '', alt: '' }}
                        bgColor={TOURNAMENTS[getTournamentIndex(item.key)]?.bgColor || ''}
                        link={TOURNAMENTS[getTournamentIndex(item.key)]?.link || ''}
                        year={item.year}
                        isSubscribed={item.isSubscribed}
                        started={item.started}
                        paymentStatus={item.paymentStatus}
                    />
                ))
                }
            </div>
        </div>
    )
}

export default TournamentCard;
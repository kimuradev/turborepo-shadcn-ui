'use client'

import { useEffect, useState } from "react";
import { getApi } from "@/lib/fetch";
import isEmpty from 'lodash/isEmpty';

import { useAuthContext } from "@/app/context/auth-context";
import { CardSkeleton } from "@/components/skeletons";

import TournamentCard from "../current-tournament/tournament-card";
import { TOURNAMENTS } from "@/lib/constants";

export default function TournamentSubscription() {
    const [data, setData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false)
    const { profile } = useAuthContext();

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await getApi('/tournaments/subscription-open', { cache: 'no-store' });

            if (isEmpty(profile)) {
                setData(response)
            } else {
                if (profile.category !== 'wta') {
                    const filteredData = response.filter((item: any) => !item.key.includes('wta'));
                    setData(filteredData)
                } else {
                    setData(response)
                }
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (profile) {
            fetchData();
        }
    }, [profile])

    useEffect(() => {
        fetchData();
    }, [])

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
        <div className="flex flex-col md:flex-row gap-2">
            {data?.map((item: any) => (
                <TournamentCard data={item} tournamentIndex={getTournamentIndex(item.key)} />
            ))}
        </div>
    )
}

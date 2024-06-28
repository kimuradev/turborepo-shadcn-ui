'use client'

import { useEffect, useState } from "react";
import isEmpty from 'lodash/isEmpty';

import { useAuthContext } from "@/app/context/auth-context";
import { TOURNAMENTS, WTA } from "@/lib/constants";
import { getApi } from "@/lib/fetch";
import { CardSkeleton } from "@/components/skeletons";

import TournamentModal from "./tournament-modal";
import TournamentCard from "./tournament-card";

export default async function TournamentSubscription({ data }: { data: any }) {
    const [isLoading, setIsLoading] = useState(false)
    const [subscriptionData, setSubscriptionData] = useState<any>([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const { profile, isAdmin } = useAuthContext();

    const fetchData = async () => {
        try {
            setIsLoading(true)
            if (isEmpty(profile) || isAdmin) {
                setSubscriptionData(data);
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
        const { isPaymentPending } = await getApi(`/tournaments/payment-status/${profile.id}`, { cache: 'no-store' });

        if (profile.id) {
            const updatedSubscriptions = await Promise.all(data.map(async (item: any) => {
                const response = await getApi(`/tournaments/subscribe/${profile.id}?year=${item.year}&tournament=${item.key}`, { cache: 'no-store' });
                if (!response) {
                    return { ...item, isPaymentPending, isSubscribed: false, paymentStatus: response?.payment_status }
                }
                return { ...item, isPaymentPending, isSubscribed: true , paymentStatus: response?.payment_status};
            }));

            setSubscriptionData(updatedSubscriptions)
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
        <div className="flex flex-col md:flex-row gap-2">
            {subscriptionData.map((item: any) => (
                <TournamentCard data={item} tournamentIndex={getTournamentIndex(item.key)} />
            ))}

            <TournamentModal modalIsOpen={modalIsOpen} handleClose={() => setModalIsOpen(false)} />
        </div>

    )
}

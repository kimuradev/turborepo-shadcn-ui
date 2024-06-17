"use client"

import { useEffect, useState } from "react";
import isEmpty from 'lodash/isEmpty'

import { useAuthContext } from "@/app/context/auth-context";
import CardTournament from "@/app/tournaments/card";
import { TOURNAMENTS } from "@/lib/constants";
import { getApi } from "@/lib/fetch";
import { CardSkeleton } from "@/components/skeletons";

function TournamentCard({ data, tournamentIndex }: any) {
    const [isLoading, setIsLoading] = useState(false);
    const { profile } = useAuthContext();
    const [subscription, setSubscription] = useState<any>(false);
    const [isPaymentPending, setIsPaymentPending] = useState(false);

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const [response, paymentResponse] = await Promise.all([
                getApi(`/tournaments/subscribe/${profile.id}?year=${data.year}&tournament=${data.key}`, { cache: 'no-store' }),
                getApi(`/tournaments/payment-status/${profile.id}`, { cache: 'no-store' })
            ]);
            setSubscription(response);
            setIsPaymentPending(paymentResponse.isPaymentPending)
        } catch (err) {
            setSubscription(false)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isEmpty(profile)) return;

        fetchData()
    }, [profile]);

    if (isLoading) {
        return <CardSkeleton />
    }

    return (
        <div className="pl-4">
            <div className='flex flex-wrap gap-6 justify-center items-center'>
                <CardTournament
                    key={data.id}
                    id={data.id}
                    title={data.name}
                    subtitle={data.description}
                    headerSrcImg={TOURNAMENTS[tournamentIndex]?.headerSrcImg || ''}
                    contentSrcImg={TOURNAMENTS[tournamentIndex]?.contentSrcImg || { src: '', alt: '' }}
                    bgColor={TOURNAMENTS[tournamentIndex]?.bgColor || ''}
                    link={TOURNAMENTS[tournamentIndex]?.link || ''}
                    year={data.year}
                    subscriptionIsOpen={data.active}
                    started={data.started}
                    subscription={subscription}
                    isPaymentPending={isPaymentPending}
                />
            </div>
        </div>
    )
}

export default TournamentCard;
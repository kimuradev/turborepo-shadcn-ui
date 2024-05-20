"use client"

import { useEffect, useState } from "react";
import { useAuthContext } from "@/app/context/auth-context";
import CardTournament from "@/app/tournaments/card";
import { TOURNAMENTS } from "@/lib/constants";
import { getApi } from "@/lib/fetch";
import isEmpty from 'lodash/isEmpty'
import Spinner from "@repo/ui/components/ui/spinner";
import { Frown } from "lucide-react";

function TournamentCard({ data }: any) {
    const [isLoading, setIsLoading] = useState(false);
    const { profile } = useAuthContext();
    const [subscription, setSubscription] = useState<any>(false);

    console.log("profile: ", profile)

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await getApi(`/tournaments/subscribe/${profile.id}?year=${data.year}&tournament=${data.key}`, { cache: 'no-store' });
            setSubscription(response);
        } catch (err) {
            setSubscription(false)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
            if (isEmpty(profile)) {
                setSubscription(false);
            } else {
                fetchData()
            }
    }, [profile]);

    const tournamentIndex = TOURNAMENTS.findIndex((tournament: any) => {
        return tournament.value === data?.key;
    })

    if (tournamentIndex == -1) {
        return (
            <div className="flex flex-col justify-center items-center mt-6">
                <Frown className="w-[50px] h-[50px] stroke-primary mb-4" />
                <p className="text-sm text-muted-foreground">Nenhum torneio ativo no momento. </p>
            </div>
        )
    }

    return (
        <div className="pl-4">
            <div className='flex flex-wrap gap-6 justify-center items-center'>
                {
                    isLoading ? (
                        <Spinner />
                    ) : (
                        <CardTournament
                            key={data.id}
                            id={data.id}
                            title={data.name}
                            subtitle={data.description}
                            headerSrcImg={TOURNAMENTS[tournamentIndex]?.headerSrcImg || ''}
                            contentSrcImg={TOURNAMENTS[tournamentIndex]?.contentSrcImg || { src: '', alt: '' }}
                            bgColor={TOURNAMENTS[tournamentIndex]?.bgColor|| ''}
                            link={TOURNAMENTS[tournamentIndex]?.link|| ''}
                            year={data.year}
                            subscriptionIsOpen={data.active}
                            started={data.started}
                            subscription={subscription}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default TournamentCard;
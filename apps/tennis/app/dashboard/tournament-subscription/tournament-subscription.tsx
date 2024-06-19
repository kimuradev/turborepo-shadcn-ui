'use client'

import { useEffect, useState } from "react";
import isEmpty from 'lodash/isEmpty';

import { useAuthContext } from "@/app/context/auth-context";
import { TOURNAMENTS } from "@/lib/constants";

import TournamentCard from "../current-tournament/tournament-card";
import TournamentModal from "./tournament-modal";

export default async function TournamentSubscription({ data }: { data: any }) {
    const [subscriptionData, setSubscriptionData] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const { profile, isAdmin } = useAuthContext();

    const getData = async () => {
        if (!isEmpty(profile) && profile.category !== 'wta' && !isAdmin) {
            setSubscriptionData(data.filter((item: any) => !item.key.includes('wta')));
        } else {
            setSubscriptionData(data);
        }
    }

    useEffect(() => {
        if (!isEmpty(profile)) {
            getData();
        }
    }, [profile])

    useEffect(() => {
        getData();
    }, [])

    const getTournamentIndex = (tournamentKey: string) => {
        const tournamentIndex = TOURNAMENTS.findIndex((tournament: any) => {
            return tournament.value === tournamentKey
        })
        return tournamentIndex
    }

    return (
        <div className="flex flex-col md:flex-row gap-2">
            {subscriptionData?.map((item: any) => (
                <TournamentCard data={item} tournamentIndex={getTournamentIndex(item.key)} />
            ))}
            <TournamentModal modalIsOpen={modalIsOpen} handleClose={() => setModalIsOpen(false)} />
        </div>

    )
}

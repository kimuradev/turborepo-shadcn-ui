"use client"

import orderBy from 'lodash/orderBy';

import { CLASSIFICATION } from "@/lib/constants";
import GamesSkeleton from '@/components/skeletons';
import GameWeek from "../game-week";
import Card from "../card";

export default function ClassificationDetails({ games, isLoading }: any) {
    const { data } = games;

    const sixteenth = data.filter((game: any) => game.round === "Sixteenthfinal");
    const eightth = orderBy(data.filter((game: any) => game.round === "Eighthfinal"), ['id', 'type'], ['asc', 'desc']);
    const semi = data.filter((game: any) => game.round === "Semifinal")
    const final = data.filter((game: any) => game.round === "final");

    if (isLoading) {
        return <GamesSkeleton />
    }

    return (
        <div>
            {
                data.length > 0 ? (
                    <div className="flex flex-col mt-4">
                        <GameWeek id={games.data[0].unique_id} week={games.game_week} />

                        <div className="flex items-center">
                            <div className="flex flex-col gap-4">
                                <Card data={sixteenth} />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Card data={eightth} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Card data={semi} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Card data={final} classification={CLASSIFICATION} />
                            </div>
                        </div>
                    </div>

                ) : (
                    <div className="mt-8">
                        <p>Nenhum torneio cadastrado.</p>
                    </div>
                )
            }
        </div>
    )
}
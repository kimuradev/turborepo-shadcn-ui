"use client"

import { useEffect, useState } from "react";
import orderBy from 'lodash/orderBy';

import GamesSkeleton from "@/components/skeletons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import useToastMessage from "@repo/ui/components/hooks/useToastMessage";
import { useAppContext } from "@/app/context/app-context";
import { CLASSIFICATION, WTA } from "@/lib/constants";
import { getApi } from "@/lib/fetch";
import { type TournamentTabsProps } from "@/lib/definitions";

import Card from "./card";
import GameWeek from "./game-week";

export default function TournamentTabs({ classes, tournament, year, classId }: TournamentTabsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { games, setGames } = useAppContext()
    const { errorMessage } = useToastMessage();

    const DEFAULT_CLASS = classId || '1';

    useEffect(() => {
        setIsLoading(true)

        const fetchData = async () => {
            try {
                const response = await getApi(`/games?year=${year}&tournament=${tournament}&classId=${DEFAULT_CLASS}`);
                setGames(response);
            } catch (err) {
                errorMessage();
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])

    const handleClickTab = async (value: string) => {
        setIsLoading(true);
        try {
            const response = await getApi(`/games?year=${year}&tournament=${tournament}&classId=${value}`);
            setGames(response);
        } catch (err) {
            errorMessage();
        } finally {
            setIsLoading(false);
        }
    }

    const { data } = games;

    const sixteenth = data.filter((game: any) => game.round === "Sixteenthfinal");
    const eightth = orderBy(data.filter((game: any) => game.round === "Eighthfinal"), ['id', 'type'], ['asc', 'desc']);
    const semi = data.filter((game: any) => game.round === "Semifinal")
    const final = data.filter((game: any) => game.round === "final");

    return (
        <Tabs defaultValue={DEFAULT_CLASS} className="w-[400px]">
            {!tournament.includes(WTA) && (
                <TabsList>
                    {classes.map((c: any) => (
                        <TabsTrigger key={c.id} value={c.id.toString()} onClick={() => handleClickTab(c.id)}>{c.name}</TabsTrigger>
                    ))}
                </TabsList>
            )}

            {classes.map((c: any) => (
                <TabsContent key={c.id} value={c.id.toString()}>
                    {isLoading ? <GamesSkeleton /> : (
                        <>
                            {
                                data.length > 0 ? (
                                    <div className="flex flex-col mt-4">
                                        {games.data[0] && <GameWeek id={games.data[0].unique_id} week={games.game_week} />}

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
                        </>
                    )}
                </TabsContent>
            ))}
        </Tabs>
    )
}
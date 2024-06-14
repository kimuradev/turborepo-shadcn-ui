"use client"

import { useEffect, useState } from "react";

import { getApi } from "@/lib/fetch";
import GamesSkeleton from "@/components/skeletons";
import { PLAYOFFS_CLASS_ID } from "@/lib/constants";
import { useAppContext } from "@/app/context/app-context";
import { type FinalsDetailsProps } from "@/lib/definitions";
import useToastMessage from "@repo/ui/components/hooks/useToastMessage";

import HeaderDetails from "./header-details";
import CardList from "./card-list";
import GameWeek from "../game-week";

export default function PlayoffsDetails({ tournament, year }: FinalsDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { games, setGames } = useAppContext()
  const { errorMessage } = useToastMessage();

  useEffect(() => {
    setIsLoading(true)

    const fetchData = async () => {
      try {
        const response = await getApi(`/games?year=${year}&tournament=${tournament}&classId=${PLAYOFFS_CLASS_ID}`);

        // test with less rounds
        // const removeData = response.data.filter((item: any) =>  item.round !== 'RoundOf64' && item.round !== 'RoundOf32' && item.round !== 'RoundOf16');
        // setGames({ data: removeData, game_week: response.game_week })

        setGames(response)
      } catch (err) {
        errorMessage();
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [])

  if (isLoading) {
    return <GamesSkeleton />
  }

  return (
    <div>
      {
        games.data?.length > 0 ? (
          <div className="flex flex-col mt-4">
            <GameWeek id={games.data[0]?.unique_id} week={games.game_week} />

           <HeaderDetails games={games} />

           <CardList games={games} tournament={tournament} year={year} />
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
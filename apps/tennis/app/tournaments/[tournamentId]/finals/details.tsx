"use client"

import { useEffect, useState } from "react";

import Spinner from "@repo/ui/components/ui/spinner";
import useToastMessage from "@/components/hooks/useToastMessage";
import { CLASSIFICATION, FINALS_CLASS_ID } from "@/lib/constants";
import { type FinalsDetailsProps } from "@/lib/definitions";
import { getApi } from "@/lib/fetch";
import { useAppContext } from "@/app/context/app-context";

import GameWeek from "../game-week";
import Card from "../card";

export default function FinalsDetails({ tournament, year }: FinalsDetailsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { games, setGames } = useAppContext()
  const { errorMessage } = useToastMessage();

  useEffect(() => {
    setIsLoading(true)

    const fetchData = async () => {
      try {
        const response = await getApi(`/games?year=${year}&tournament=${tournament}&classId=${FINALS_CLASS_ID}`);
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
    return <Spinner />
  }

  return (
    <div>
      {
        games.data?.length > 0 ? (
          <div className="flex flex-col mt-4">
            <GameWeek id={games.data[0].unique_id} week={games.game_week} />

            <div className="flex items-center">
              <div className="flex flex-col justify-center items-center">
                <span className="m-4 text-muted-foreground font-semibold">Grupo A</span>
                <Card data={games.data.filter((game: any) => game.round === "Group-A")} />
              </div>
              <div className="flex flex-col items-center">
                <span className="m-4 text-muted-foreground font-semibold">Grupo B</span>
                <Card data={games.data.filter((game: any) => game.round === "Group-B")} />
              </div>
              <div className="flex flex-col items-center">
                <span className="m-4 text-muted-foreground font-semibold">Semi-Final</span>
                <Card data={games.data.filter((game: any) => game.round === "Semifinal")} />
              </div>
              <div className="flex flex-col items-center">
                <span className="m-4 text-muted-foreground font-semibold">Final</span>
                <Card data={games.data.filter((game: any) => game.round === "final")} classification={CLASSIFICATION} />
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
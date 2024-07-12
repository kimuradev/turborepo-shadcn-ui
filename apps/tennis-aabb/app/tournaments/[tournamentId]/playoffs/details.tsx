"use client"

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import GamesSkeleton from "@/components/skeletons";

import HeaderDetails from "./header-details";
import CardList from "./card-list";
import GameWeek from "../game-week";
import { Button } from "@ui/components/ui/button";
import { Printer } from "lucide-react";

type PlayoffsDetailsProps = {
  classes: any,
  games: any,
  isLoading: boolean,
  tournament: string,
  year: number,
  classId: string,
}

export default function PlayoffsDetails({ classes, games, isLoading, tournament, year, classId }: PlayoffsDetailsProps) {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current ? componentRef.current : null,
  });

  if (isLoading) {
    return <GamesSkeleton />
  }

  return (
    <div>
      <Button variant="link" className="flex gap-2 absolute top-[-35px] left-[320px]" onClick={handlePrint}>
        <Printer className="h4 w-4" />
        <span>Imprimir</span>
      </Button>
      {
        games.data?.length > 0 ? (
          <div className="flex flex-col mt-4">
            <GameWeek id={games.data[0]?.unique_id} week={games.game_week} />

            <HeaderDetails games={games} />

            <CardList classes={classes} games={games} tournament={tournament} year={year} classId={classId} ref={componentRef} />
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
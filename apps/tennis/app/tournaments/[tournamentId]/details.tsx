"use client"

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TOURNAMENT_ID } from "@/lib/constants";
import { getApi } from "@/lib/fetch";
import { useAppContext } from "@/app/context/app-context";
import Spinner from "@/components/ui/spinner";
import { type TournamentDetails } from "@/lib/definitions";

import TournamentTabs from "./tabs";
import FinalsDetails from "./finals/details";


export default function TournamentDetails({ tournament }: TournamentDetails) {
  const { classes, setClasses, isFinals, setIsFinals } = useAppContext()
  const searchParams = useSearchParams()

  const year: any = searchParams.get('year')
  const classId: any = searchParams.get('classId')

  useEffect(() => {
    setIsFinals(tournament === TOURNAMENT_ID.FINALS ? true : false)
  }, [])

  const fetchData = async () => {
    const response = await getApi('/classes');
    setClasses(response)
  }

  if (!classes.length && !isFinals) {
    fetchData();
    return <Spinner />
  }

  return (
    <div>
      <h2 className="text-sm text-muted-foreground mb-6">Ano: {year}</h2>
      {isFinals ? (
        <FinalsDetails tournament={tournament} year={year} />
      ) : (
        <TournamentTabs classes={classes} tournament={tournament} year={year} classId={classId} />
      )}
    </div>
  )
}

"use client"

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TOURNAMENT_ID } from "@/lib/constants";
import { getApi } from "@/lib/fetch";
import { useAppContext } from "@/app/context/app-context";
import Spinner from "@repo/ui/components/ui/spinner";
import { type TournamentDetailsProps } from "@/lib/definitions";
import Banner from '@/public/img/banner1.jpg'

import TournamentTabs from "./tabs";
import FinalsDetails from "./finals/details";


export default function TournamentDetails({ tournament }: TournamentDetailsProps) {
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

      <div className="mb-4 w-[1200px] h-[100px]">
        <Link href="https://www.instagram.com/pibcuritiba/" target="_blank">
          <Image src={Banner} width={1200} height={100} alt="Ajude o Rio Grande do Sul" />
        </Link>
      </div>

      {isFinals ? (
        <FinalsDetails tournament={tournament} year={year} />
      ) : (
        <TournamentTabs classes={classes} tournament={tournament} year={year} classId={classId} />
      )}
    </div>
  )
}

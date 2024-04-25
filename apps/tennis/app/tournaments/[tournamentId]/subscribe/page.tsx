'use client'

import { TOURNAMENTS, TOURNAMENT_DICTIONARY } from "@/lib/constants";
import SubscribeForm from "./subscribe-form";
import { Alert } from "@/components/ui/alert";
import { Trophy } from "lucide-react";
import isAuth from "@/components/hooks/isAuth";

function Page({ params, searchParams }: { params: any, searchParams: any }) {
  const { tournamentId } = params;
  const { year } = searchParams
  const tournament: any = TOURNAMENT_DICTIONARY.find(t => t.id === tournamentId)
  const bgColor = TOURNAMENTS.find(t => t.value === tournament?.id)?.bgColor;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-lg mb-10">Inscrição torneio:</h2>

      <div className="flex self-center md:w-[700px]">
        <Alert className={`flex justify-center items-center gap-4 border ${bgColor}`}>
          <div>
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <h5 className="font-semibold">{tournament?.value} - {year}</h5>
          </div>
        </Alert>
      </div>

      <div className="flex self-center mt-8 md:w-[700px]">
        <SubscribeForm tournament={tournament} year={year} />
      </div>
    </div>
  );
}

export default isAuth(Page);
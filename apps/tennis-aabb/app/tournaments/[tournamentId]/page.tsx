import { TOURNAMENT_DICTIONARY, TOURNAMENT_ID } from "@/lib/constants";
import TournamentDetails from "./details";

export async function generateStaticParams() {
  return [
    {
      tournamentId: TOURNAMENT_ID.AABB,
    },
    // {
    //   tournamentId: TOURNAMENT_ID.AO,
    // },
    // {
    //   tournamentId: TOURNAMENT_ID.RG,
    // },
    // {
    //   tournamentId: TOURNAMENT_ID.WIMBLEDON,
    // },
    // {
    //   tournamentId: TOURNAMENT_ID.US,
    // },
    // {
    //   tournamentId: TOURNAMENT_ID.FINALS,
    // },
  ];
}

export default function Page({ params, searchParams }: { params: any, searchParams: any }) {
  const tournament: { id : string, value: string} | undefined = TOURNAMENT_DICTIONARY.find(t => t.id === params.tournamentId)

  return (
    <div>
      <h2 className="font-bold text-lg mb-1">Torneio: {tournament?.value}</h2>

      <TournamentDetails tournament={params.tournamentId} {...searchParams}/>
    </div>
  )
}



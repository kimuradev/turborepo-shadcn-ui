import { getApi } from "@/lib/fetch";

export default async function Page({ searchParams }: any) {
  const data = await getApi(`/players/subscribed-tournament?tournamentId=${searchParams.tournamentId}&year=${searchParams.year}`, { cache: 'no-store' });

  return (
    <>
      <div>
        <h2 className="font-bold text-lg mt-1">Jogadores inscritos</h2>
        <span className="text-sm text-muted-foreground">Torneio: {searchParams.tournamentId} - {searchParams.year}</span>
      </div>

      {['A', 'B', 'C', 'D', 'E'].map((classLetter) => (
        <div key={classLetter} className="mt-4">
          <h3 className="font-semibold text-lg text-indigo-500">Classe {classLetter}</h3>
          <ul className="list-none pl-5 mt-2">
            {data.filter((player: any) => player.class_name === `Classe ${classLetter}`).map((player: any) => (
              <li key={player.player_id} className="text-gray-700">{player.player_name}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )
}
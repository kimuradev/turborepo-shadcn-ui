import { getApi } from "@tennis/lib/fetch";
import PlayerList from "./player-list"

export default async function Page() {
  const data = await getApi('/players', { cache: 'no-store' });

  return (
    <>
      <h2 className="font-bold text-lg mt-1">Jogadores</h2>
      <PlayerList players={data} />
    </>
  )
}
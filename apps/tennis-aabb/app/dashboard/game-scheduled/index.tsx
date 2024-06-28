import { getApi } from "@/lib/fetch";
import GameTable from "./game-table";

export default async function GameScheduled() {
    const data = await getApi('/games/schedule', { cache: 'no-store' });

    return (
       <GameTable data={data} />
    )
}

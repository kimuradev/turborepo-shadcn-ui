import { PlayersProps } from "@/lib/definitions";
import { getApi } from "@/lib/fetch";

export async function generateStaticParams() {
    const players = await getApi('/players');

    return players.map((player: PlayersProps) => ({
        id: player.id
    }))
}

export default function ({ children }: { children: React.ReactNode }) { return children }
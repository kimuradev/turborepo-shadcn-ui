import { getApi } from "@tennis/lib/fetch";

export async function generateStaticParams() {
    const players = await getApi('/players');

    return players.map((player: any) => ({
        id: player.id
    }))
}

export default function ({ children }: { children: React.ReactNode }) { return children }
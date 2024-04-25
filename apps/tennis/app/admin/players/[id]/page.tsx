import { getApi } from "@/lib/fetch";
import Player from "../Player";

async function Page({ params }: { params: { id: string } }) {
    const player = await getApi(`/players/${params.id}`, { cache: 'no-store' });

    return (
        <div className="flex flex-1 flex-col">
            <h2 className="font-bold text-lg mb-10">Editar jogador</h2>
            <div className="flex justify-center items-center">
                <Player player={player} />
            </div>
        </div>
    )
}

export default Page;
import { getNameWithAbbreviation } from "@/lib/utils";
import { format } from "date-fns";
import { parseISO } from "date-fns/parseISO";
import { ptBR } from "date-fns/locale";

type GameTable = {
    data: any
}

export default function GameTable({ data }: GameTable) {
    return (
        <div className="overflow-auto max-h-[400px] w-full">
            {data.map((game: any) => {
                return (
                    <div className="flex flex-col gap-1">
                        <div className="bg-secondary font-bold px-2 py-1 rounded">{format(parseISO(game.scheduleDate), 'dd/MM/yyyy - eee', { locale: ptBR })}</div>
                        {game.games.map((item: any) => (
                            <div className="text-sm px-4 py-1">{format(item.schedule, 'HH:mm')} - {getNameWithAbbreviation(item.player1?.name)} x {getNameWithAbbreviation(item.player2?.name)}</div>
                        ))}
                    </div>
                )
            })}
        </div>
    )
}

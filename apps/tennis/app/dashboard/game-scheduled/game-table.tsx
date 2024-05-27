import { getFormattedDate, getNameWithAbbreviation } from "@/lib/utils";
// import { format } from "date-fns";
import { format } from 'date-fns-tz';
import ShareButton from "./share-button";
import { CalendarX } from "lucide-react";
import { DetailsProps } from "@/lib/definitions";

type GameDataProps = {
    scheduleDate: string
    games: DetailsProps[]
}

type GameTable = {
    data: GameDataProps[]
}

export default function GameTable({ data }: GameTable) {
    if (!data.length) {
        return (
            <div className="flex flex-col justify-center items-center mt-6">
                <CalendarX className="w-[50px] h-[50px] stroke-primary mb-4" />
                <p className="text-sm text-muted-foreground">Nenhum jogo marcado no momento. </p>
            </div>
        )
    }


    return (
        <div className="overflow-auto max-h-[400px] w-full">
            <ShareButton data={data} />
            {data.map((game: any) => {
                return (
                    <div className="flex flex-col gap-1">
                        <div className="bg-secondary font-bold px-2 py-1 rounded">{getFormattedDate(game.scheduleDate)}</div>
                        {game.games.map((item: { schedule: string, player1: { name: string }, player2: { name: string } }) => (
                            <div className="text-sm px-4 py-1">{format(item.schedule, 'HH:mm', {
                                timeZone: 'America/Sao_Paulo',
                            })} - {getNameWithAbbreviation(item.player1?.name)} x {getNameWithAbbreviation(item.player2?.name)}</div>
                        ))}
                    </div>
                )
            })}
        </div>
    )
}

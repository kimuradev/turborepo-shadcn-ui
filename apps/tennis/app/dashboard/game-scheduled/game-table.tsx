import { getFormattedDate, getNameWithAbbreviation } from "@/lib/utils";
import { format, toZonedTime } from 'date-fns-tz'
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

    const formatHourTimezone = (dateStr: string) => {
        // Convert the date to the desired timezone
        const timeZone = 'America/Sao_Paulo';
        const zonedDate = toZonedTime(dateStr, timeZone);
        // Format the date to HH:mm in the specified timezone
        return format(zonedDate, 'HH:mm', { timeZone });
    }

    const getCurrentClass = (classId: number, isWta: boolean) => {
        switch (classId) {
            case 1:
                return isWta ? 'WTA - Classe Slam' : 'Classe Slam';
            case 2:
                return isWta ? 'WTA - Classe 1000' : 'Classe 1000';
            case 3:
                return isWta ? 'WTA - Classe 500' : 'Classe 500';
            case 4:
                return isWta ? 'WTA - Classe 250' : 'Classe 250';
            case 5:
                return isWta ? 'WTA - Classe 125' : 'Classe 125';
            case 6:
                return isWta ? 'WTA - Classe 70' : 'Classe 70';
            default:
                break;
        }
    }

    return (
        <div className="overflow-auto max-h-[400px] w-full">
            <ShareButton data={data} />

            {data.map((game: any) => {
                return (
                    <div className="flex flex-col gap-1" key={game.id}>
                        <div className="bg-secondary font-bold px-2 py-1 rounded">{getFormattedDate(game.scheduleDate)}</div>
                        {game.games.map((item: { schedule: string, player1: { name: string }, player2: { name: string }, class_id: number, is_wta: boolean }) => {
                            return (
                                <div className="text-sm px-4 py-1" key={item.schedule}>{formatHourTimezone(item.schedule)} - {getNameWithAbbreviation(item.player1?.name)} x {getNameWithAbbreviation(item.player2?.name)} ({getCurrentClass(item.class_id, item.is_wta)})</div>
                            )
                        }
                        )}
                    </div>
                )
            })}
        </div>
    )
}

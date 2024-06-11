import { getFormattedDate, getNameWithAbbreviation } from "@/lib/utils";
// import { format } from "date-fns";
import isArray from 'lodash/isArray';
import cloneDeep from 'lodash/cloneDeep';
import findIndex from 'lodash/findIndex';
import mergeWith from 'lodash/mergeWith';
import sortBy from 'lodash/sortBy';
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

    // TODO: REMOVE IT AFTER DUPLAS TOURNAMENTS
    const newData = [{
        scheduleDate: '2024-06-11', games: [
            {
                id: 1,
                game_id: 1,
                schedule: '2024-06-11T21:30:00.000Z',
                player1: { name: 'Kimura/Clebis' },
                player2: { name: 'Jose/Marco' },
            },
            {
                id: 2,
                game_id: 2,
                schedule: '2024-06-11T22:30:00.000Z',
                player1: { name: 'Perdedor 1' },
                player2: { name: 'Nilton/Karin' },
            },
            {
                id: 3,
                game_id: 3,
                schedule: '2024-06-12T00:30:00.000Z',
                player1: { name: 'Nilton/Karin' },
                player2: { name: 'Vencedor 1' },
            },
        ]
    },
    {
        scheduleDate: '2024-06-13', games: [
            {
                id: 1,
                game_id: 1,
                schedule: '2024-06-13T21:30:00.000Z',
                player1: { name: 'Navarro/Susin' },
                player2: { name: 'Vlademir/Floriano' },
            },
            {
                id: 2,
                game_id: 2,
                schedule: '2024-06-13T22:30:00.000Z',
                player1: { name: 'Perdedor 1' },
                player2: { name: 'Adriano/Walter' },
            },
            {
                id: 3,
                game_id: 3,
                schedule: '2024-06-13T00:30:00.000Z',
                player1: { name: 'Adriano/Walter' },
                player2: { name: 'Vencedor 1' },
            },
        ]
    },
    {
        scheduleDate: '2024-06-14', games: [
            {
                id: 1,
                game_id: 1,
                schedule: '2024-06-14T21:30:00.000Z',
                player1: { name: 'Robinson/Claudinei' },
                player2: { name: 'Angelo/Makoto' },
            },
            {
                id: 2,
                game_id: 2,
                schedule: '2024-06-14T22:30:00.000Z',
                player1: { name: 'Perdedor 1' },
                player2: { name: 'Tiago/Rogerinho' },
            },
            {
                id: 3,
                game_id: 3,
                schedule: '2024-06-14T00:30:00.000Z',
                player1: { name: 'Tiago/Rogerinho' },
                player2: { name: 'Vencedor 1' },
            },
        ]
    },
    {
        scheduleDate: '2024-06-15', games: [
            {
                id: 1,
                game_id: 1,
                schedule: '2024-06-15T11:00:00.000Z',
                player1: { name: '1º primeiro' },
                player2: { name: '1º segundo' },
            },
            {
                id: 2,
                game_id: 2,
                schedule: '2024-06-15T11:00:00.000Z',
                player1: { name: '2º primeiro' },
                player2: { name: '3º primeiro' },
            },
            {
                id: 3,
                game_id: 3,
                schedule: '2024-06-15T12:30:00.000Z',
                player1: { name: 'Vencedor semi-1' },
                player2: { name: 'Vencedor semi-2' },
            },
        ]
    },
    ]

    const formatHourTimezone = (dateStr: string) => {
        // Convert the date to the desired timezone
        const timeZone = 'America/Sao_Paulo';
        const zonedDate = toZonedTime(dateStr, timeZone);
        // Format the date to HH:mm in the specified timezone
        return format(zonedDate, 'HH:mm', { timeZone });
    }

    function customizer(objValue: any, srcValue: any) {
        if (isArray(objValue)) {
            return objValue.concat(srcValue);
        }
    }

    const mergedData = cloneDeep(data);  // Create a deep clone of data to avoid modifying the original
    newData.forEach((newItem: any) => {
        const index = findIndex(mergedData, { scheduleDate: newItem.scheduleDate });
        if (index !== -1) {
            mergeWith(mergedData[index], newItem, customizer);
        } else {
            mergedData.push(newItem);
        }
    });
    // Sort the mergedData array by scheduleDate
    const sortedData = sortBy(mergedData, ['scheduleDate']);


    return (
        <div className="overflow-auto max-h-[400px] w-full">
            <ShareButton data={sortedData} />
            {sortedData.map((game: any) => {
                // console.log('game: ', game)
                return (
                    <div className="flex flex-col gap-1" key={game.id}>
                        <div className="bg-secondary font-bold px-2 py-1 rounded">{getFormattedDate(game.scheduleDate)}</div>
                        {game.games.map((item: { schedule: string, player1: { name: string }, player2: { name: string } }) => {
                            return (
                                <div className="text-sm px-4 py-1" key={item.schedule}>{formatHourTimezone(item.schedule)} - {getNameWithAbbreviation(item.player1?.name)} x {getNameWithAbbreviation(item.player2?.name)}</div>
                            )
                        }
                        )}
                    </div>
                )
            })}
        </div>
    )
}

import { format } from "date-fns";

type GameTable = {
    data: any
}

export default function GameTable({ data }: GameTable) {
    return (
        <div className="overflow-auto max-h-[400px] w-full">
            {data.map((game: any) => {
                return (
                    <div>
                        <div className="bg-secondary font-bold px-2 py-1 rounded">{format(game.scheduleDate, 'dd/MM/yyyy')}</div>
                        {game.games.map((item: any) => (
                            <div className="text-sm px-4 py-1">{format(item.schedule, 'HH:mm')} - {item.player1.name} x {item.player2.name}</div>
                        ))}
                    </div>
                )
            })}
        </div>
    )
}

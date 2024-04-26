import Image from 'next/image';
import { Button } from "@repo/ui/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import AOCircle from '@tennis/public/static/ao-circle.png';
import RGCircle from '@tennis/public/static/rg-circle.png';
import WimbledonCircle from '@tennis/public/static/wimb-circle.png';
import USCircle from '@tennis/public/static/us-circle.png';
import FinalsCircle from '@tennis/public/static/finals-circle.png';

export type Ranking = {
    id: string
    player_name: string
    class: string,
    points: number,
    year: string,
    tournaments: ("wimbledon" | "usopen" | "rolandgarros" | "australian" | "finals")[]
}

export const columns: ColumnDef<Ranking>[] = [
    {
        accessorKey: "player_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Jogador
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "points",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Pontos
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "year",
        filterFn: (row: any, id, filterValue) => row.getValue(id) == filterValue,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Ano
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "played_tournaments",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Torneios jogados
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const tournaments: any = row.getValue("played_tournaments");

            return (
                <div className="flex gap-4">
                    {tournaments.map((t: any) => {
                        switch (t.tournament) {
                            case 'us':
                                return (
                                    <div className='flex flex-col justify-center items-center'>
                                        <Image src={USCircle} width={30} height={30} alt="US Open" placeholder='blur' />
                                        <span className='text-xs text-muted-foreground pt-1'>{t.points} pts</span>
                                    </div>
                                )
                            case 'wimbledon':
                                return (
                                    <div className='flex flex-col justify-center items-center'>
                                        <Image src={WimbledonCircle} width={30} height={30} alt="Wimbledon" placeholder='blur' />
                                        <span className='text-xs text-muted-foreground pt-1'>{t.points} pts</span>
                                    </div>
                                )
                            case 'rg':
                                return (
                                    <div className='flex flex-col justify-center items-center'>
                                        <Image src={RGCircle} width={30} height={30} alt="Roland Garros" placeholder='blur' />
                                        <span className='text-xs text-muted-foreground pt-1'>{t.points} pts</span>
                                    </div>
                                )
                            case 'ao':
                                return (
                                    <div className='flex flex-col justify-center items-center'>
                                        <Image src={AOCircle} width={30} height={30} alt="Australian Open" placeholder='blur' />
                                        <span className='text-xs text-muted-foreground pt-1'>{t.points} pts</span>
                                    </div>
                                )
                            case 'finals':
                                return (
                                    <div className='flex flex-col justify-center items-center'>
                                        <Image src={FinalsCircle} width={30} height={30} alt="AB Finals" placeholder='blur' />
                                        <span className='text-xs text-muted-foreground pt-1'>{t.points} pts</span>
                                    </div>
                                )
                            default:
                                null;
                        }
                    })}
                </div>)
        }
    },
]

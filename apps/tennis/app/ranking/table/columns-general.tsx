import { Button } from "@repo/ui/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

export type Ranking = {
    id: string
    player_name: string
    points: number,
}

export const columns: ColumnDef<Ranking>[] = [
    {
        accessorKey: "position",
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
            >
                Posição 
            </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex gap-4">
                    {row.index + 1 }º
                </div>)
        }
    },
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
]

import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@repo/ui/components/ui/button"
import { type Players } from "@/lib/definitions";

export function useSubscriptionTable() {

  const columns: ColumnDef<Players>[] = [
    {
      accessorKey: "player_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "player_id",
      header: ({ column }) => {
        return (
         <span>Status</span>
        )
      },
      cell: ({ row }) => 'Inscrição confirmada',
    },
  ]

  return [{
    columns
  },]
}
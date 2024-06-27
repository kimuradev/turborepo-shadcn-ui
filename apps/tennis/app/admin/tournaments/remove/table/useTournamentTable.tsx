"use client"

import { ArrowUpDown, MoreHorizontal, XCircle } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"
import { Button } from "@repo/ui/components/ui/button"

import { useAuthContext } from "@/app/context/auth-context";
import { type Tournaments } from "@/lib/definitions";

export function useTournamentTable({ setDialog }: { setDialog : any }) {
  const { signed, isAdmin } = useAuthContext();

  const columns: ColumnDef<Tournaments>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
           Torneio
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
      accessorKey: "active",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => row.getValue("active") ? 'Ativo' : 'Inativo',
    },
    {
      accessorKey: "started",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) =>  row.getValue("active") && row.getValue("started") ? 'Em andamento' : 'Finalizado',
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const handleDelete = async (key: string, name: string, year: string) => {
          setDialog((state: any) => ({
            ...state,
            data: { key, name, year },
            isOpen: true
          }))
        }

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {signed && isAdmin && !!row.getValue("active") && (
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                      onClick={() => { handleDelete(row.original.key, row.original.name, row.original.year) }}
                    >
                      <XCircle className="h-4 w-4 stroke-red-400" />
                      <span className="pl-4">Excluir</span>
                    </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )
      },
    }
  ]

  return [{
    columns
  },]
}
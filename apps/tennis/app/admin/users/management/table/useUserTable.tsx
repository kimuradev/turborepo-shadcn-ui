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
import { type Users } from "@/lib/definitions";

export function useUserTable({ setDialog }: { setDialog : any }) {
  const { signed, isAdmin } = useAuthContext();

  const columns: ColumnDef<Users>[] = [
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            E-mail
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "cpf",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CPF
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => isAdmin ? row.getValue("cpf") : '***-***-***-**',
    },
    {
      accessorKey: "checked",
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
      cell: ({ row }) => row.getValue("checked") ? 'Verificado' : 'Não verificado',
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const handleDelete = async (id: string, cpf: string, email: string) => {
          setDialog((state: any) => ({
            ...state,
            data: { id, cpf, email },
            isOpen: true
          }))
        }

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {signed && isAdmin && (
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* Disable it temporarely */}
                {/* <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => { router.push(`/admin/players/${row.original.id}`) }}
                >
                  <UserCog className="h-4 w-4" />
                  <span className="pl-4">Editar</span>
                </DropdownMenuItem> */}
                
                <DropdownMenuItem
                      onClick={() => { handleDelete(row.original.id, row.original.cpf, row.original.email) }}
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
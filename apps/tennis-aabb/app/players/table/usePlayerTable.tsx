"use client"

import Link from "next/link";
import { ArrowUpDown, MoreHorizontal, UserCog, MessageCircle } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"
import { Button } from "@repo/ui/components/ui/button"

import { formatPhoneNumber } from "@/lib/utils";
import { useAuthContext } from "@/app/context/auth-context";
import { type Players } from "@/lib/definitions";
import { IS_TRIAL_MODE } from "@/lib/constants";

export function usePlayerTable() {
  const router = useRouter();

  const { signed, isAdmin } = useAuthContext();

  const columns: ColumnDef<Players>[] = [
    {
      accessorKey: "name",
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
      accessorKey: "phone",
      header: () => {
        return (
          <Button
            variant="ghost"
          >
            Telefone
          </Button>
        )
      },
      cell: ({ row }: any) => {
        const phoneNumber = row.getValue('phone')

        if (!phoneNumber) { return '-' }

        if (!isAdmin) return 'XX XXXX-XXXXX'

        return (
          <Link href={`https://wa.me/${phoneNumber.replace(/\D/g, '')}`} target="_blank" className="hover:text-primary underline" >
            <div className="flex items-center gap-2">
              {formatPhoneNumber(row.getValue("phone"))}
              <MessageCircle className="h-8 w-8 md:h-4 md:w-4 stroke-green-400" />
            </div>
          </Link >
        )
      }
    },
    {
      accessorKey: "status",
      filterFn: (row: any, id, filterValue) => row.getValue(id).startsWith(filterValue),
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => row.getValue("status"),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        // const handleDelete = async (id: string, name: string) => {
        //   setDialog(state => ({
        //     ...state,
        //     data: { id, name },
        //     isOpen: true
        //   }))
        // }

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
                {IS_TRIAL_MODE ? (
                  <DropdownMenuItem
                    className="opacity-50 cursor-default"
                    onClick={() => { }}
                  >
                    <UserCog className="h-4 w-4" />
                    <span className="pl-4">Editar</span>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => { router.push(`/admin/players/${row.original.id}`) }}
                  >
                    <UserCog className="h-4 w-4" />
                    <span className="pl-4">Editar</span>
                  </DropdownMenuItem>
                )}

                {/* Disable it temporarely */}
                {/* <DropdownMenuItem
                      onClick={() => { handleDelete(row.original.id, row.original.name) }}
                    >
                      <XCircle className="h-4 w-4 stroke-red-400" />
                      <span className="pl-4">Excluir</span>
                    </DropdownMenuItem> */}
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
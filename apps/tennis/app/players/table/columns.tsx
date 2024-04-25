// import { Button } from "@/components/ui/button"
// import { ColumnDef } from "@tanstack/react-table"
// import { ArrowUpDown, MoreHorizontal, UserCog, XCircle } from "lucide-react"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { api } from "@/lib/axios"
// import DialogDemo from "@/app/players/dialog"
// import { useMemo, useState } from "react"

// export type Players = {
//   id: string
//   class: string,
//   status: "Ativo" | "Afastado" | "Inativo"
//   name: string
// }

// type DialogProps = {
//   isOpen: boolean,
//   data: {
//     id: string
//   }
// }


// export const columns: ColumnDef<Players>[] = useMemo(() => [
//   {
//     accessorKey: "name",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Nome
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//   },
//   {
//     accessorKey: "class",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Classe atual
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//   },
//   {
//     accessorKey: "status",
//     filterFn: (row: any, id, filterValue) => row.getValue(id).startsWith(filterValue),
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Status
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//     cell: ({ row }) => row.getValue("status")
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ table, row }) => {
//       // let data = this.state.data;
//       // console.log('data: ', data)
//       const [dialog, setDialog] = useState<DialogProps>({
//         isOpen: false,
//         data: { id: '' },
//       })

//       const handleCancel = () => {
//         console.log('handleCancel...: ')
//         setDialog(state => ({
//           ...state,
//           isOpen: false
//         }))
//       }

//       const handleSubmit = async () => {
//         console.log('handleSubmit...: ')
//         setDialog(state => ({
//           ...state,
//           isOpen: false
//         }))
//         const response = await api.delete(`/players/${dialog.data.id}`)

//         console.log('response: ', response)
//       }

//       const handleDelete = async (id: string) => {
//         console.log('handleDelete: ', id)
//         setDialog(state => ({
//           ...state,
//           data: { id },
//           isOpen: true
//         }))
//       }

//       return (
//         <>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 <span className="sr-only">Abrir menu</span>
//                 <MoreHorizontal className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Açoes</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 onClick={() => { console.log(row.original.id) }}
//               >
//                 <UserCog className="h-4 w-4" />
//                 <span className="pl-4">Editar</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => { handleDelete(row.original.id) }}
//               >
//                 <XCircle className="h-4 w-4 stroke-red-400" />
//                 <span className="pl-4">Excluir</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <DialogDemo isOpen={dialog.isOpen} handleCancel={handleCancel} handleSubmit={handleSubmit} />
//         </>
//       )
//     },
//   }
// ], [])



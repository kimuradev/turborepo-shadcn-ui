"use client"

import * as React from "react"

import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui/components/ui/table"
import { Button } from "@ui/components/ui/button";
import FilterTable from "./filter-table";
import { TableSkeleton } from "./skeletons";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  filtering?: any
  isLoading?: boolean,
  columnVisibility?: any
  autoResetPageIndex?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filtering,
  isLoading,
  columnVisibility,
  autoResetPageIndex = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  React.useEffect(() => {
    if (filtering.length) {
      filtering.map((filter: any) => {
        if (filter.select && filter.select.defaultValue) {
          const defaultValueFilter = [{ id: 'year', value: filter.select.defaultValue }]
          setColumnFilters(defaultValueFilter)
        }
      })
    }
  }, [filtering])

  const table = useReactTable({
    data,
    columns,
    autoResetPageIndex,
    initialState: { pagination: { pageSize: 10, pageIndex: 0 } },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility
    },
  })

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <FilterTable table={table} filtering={filtering} />
      </div>
      <div className="rounded-md border">
        {isLoading ? (
          <div>
            <TableSkeleton />
          </div>
          
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={index % 2 === 0 ? 'bg-primary/10 hover:bg-primary/40' : 'bg-white hover:bg-primary/40'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}

      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div>
          <select
            className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden lg:block">
          <span className="text-sm text-muted-foreground">Total de jogadores: {data.length}</span>
        </div>
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {`< Anterior`}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {`Próximo >`}
          </Button>
        </div>
      </div>
    </div>
  )
}

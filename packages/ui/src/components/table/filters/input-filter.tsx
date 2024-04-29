"use client"

import { Input } from '@ui/components/ui/input';

import {
  Table,
} from '@tanstack/react-table'

type InputFilter = {
  table: Table<any>,
  placeholder: string,
  columnId: string
}

function InputFilter({ table, placeholder, columnId} : InputFilter) {
    return (
        <Input
          placeholder={placeholder}
          value={(table.getColumn(columnId)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(columnId)?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
    )
}

export default InputFilter;
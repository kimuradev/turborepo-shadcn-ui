"use client"

import { Table } from '@tanstack/react-table'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@ui/components/ui/select"

type SelectOptions = {
    value: string,
    label: string
}

type SelectFilter = {
    table: Table<any>,
    columnId: string,
    placeholder: string,
    options: SelectOptions[],
    defaultValue: string,
}

function SelectFilter ({ table, columnId, placeholder, options, defaultValue } : SelectFilter) {
    const handleChange = (value: string) => {
        return table.getColumn(columnId)?.setFilterValue(value)
    }

    return (
        <Select onValueChange={handleChange} defaultValue={defaultValue}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
            {options.map((option : SelectOptions) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
        </SelectContent>
    </Select>
    )
}

export default SelectFilter;
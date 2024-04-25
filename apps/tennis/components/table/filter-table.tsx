import InputFilter from "./filters/input-filter"
import SelectFilter from "./filters/select-filter"

type Filtering = {
    input: string,
    select: string
}

type FilterTableProps = {
    table: any,
    filtering: Filtering[]
}

function FilterTable({ table, filtering = [] }: FilterTableProps) {
    return (
        <>
            {
                filtering.map((filter: any) => {
                    if (filter.input) {
                        return <InputFilter key={filter.input.columnId} table={table} columnId={filter.input.columnId} placeholder={filter.input.placeholder}  />
                    }
                    if (filter.select) {
                        return (
                           <SelectFilter key={filter.select.columnId} table={table} columnId={filter.select.columnId} options={filter.select.options} placeholder={filter.select.placeholder} defaultValue={filter.select.defaultValue}/>
                        )
                    }
                })
            }
        </>
    )
}

export default FilterTable;
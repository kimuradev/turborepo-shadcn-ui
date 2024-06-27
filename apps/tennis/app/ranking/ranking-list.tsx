import { DataTable } from "@repo/ui/components/table/data-table";

export default function RankingList({ data, columnType, filterType, isLoading }: { data: any, columnType: any, filterType: any, isLoading: boolean }) {
    return (
        <div className="container mx-auto p-0">
            <DataTable columns={columnType} data={data} filtering={filterType} isLoading={isLoading} />
        </div>
    )
}


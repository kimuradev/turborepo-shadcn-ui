import { Users } from "lucide-react"
import Link from "next/link"

import Spinner from "@repo/ui/components/ui/spinner"
import { type TopTenDataProps } from "@/lib/definitions"
import { getNameWithAbbreviation } from "@/lib/utils"
import TopTenCard from "./top-ten-card"

export default function TopTen({ data, isLoading }: TopTenDataProps) {
    if (isLoading) {
        return <div className="flex justify-center"><Spinner /></div>
    }

    if (!data.length) {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Users className="w-[50px] h-[50px] stroke-primary mb-4" />
                <p className="text-sm text-muted-foreground">Nenhum jogador possui pontos no momento. </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-between space-y-6">
            <div className="flex flex-col gap-4 p-0 md:px-8 overflow-auto max-h-[400px]">
                {data.map((item, index) => (
                    <TopTenCard key={item.player_name} player_name={getNameWithAbbreviation(item.player_name)} class_id={item.class_id} points={item.points} index={index} />
                ))}
            </div>
            <div>
                <Link href='/ranking' className="text-primary">Ver ranking completo</Link>
            </div>
        </div>
    )
}
import { Users } from "lucide-react"
import Link from "next/link"

import Spinner from "@repo/ui/components/ui/spinner"
import TopTenCard from "./top-ten-card"
import { type TopTenDataProps } from "@/lib/definitions"

export default function TopTen({ data, isLoading }: TopTenDataProps) {
    if (isLoading) {
        return <div className="flex justify-center"><Spinner /></div>
    }

    if (!data.length) {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Users className="w-[50px] h-[50px] stroke-orange-500 mb-4" />
                <p className="text-sm text-muted-foreground">Nenhum jogador possui pontos no momento. </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-between p-4 space-y-6">
            <div className="flex flex-col gap-6">
                {data.map((item, index) => (
                    <TopTenCard key={item.player_name} player_name={item.player_name} class_id={item.class_id} points={item.points} index={index} />
                ))}
            </div>
            <div>
                <Link href='/ranking' className="text-orange-400">Ver ranking completo</Link>
            </div>
        </div>
    )
}
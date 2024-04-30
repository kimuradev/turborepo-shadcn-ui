'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { CreditCard, Trophy } from "lucide-react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/ui/select"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/ui/card"
import { YEARS } from "@/lib/constants"
import AnuityPieChart from "./charts/anuity-pie-chart"
import { TournamentBarChart } from "./charts/tournament-bar-chart"
import { getApi } from "@/lib/fetch"

export function CardsStats() {
    const [year, setYear] = useState('2024')
    const [finance, setFinance] = useState<any>({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await getApi(`/settings/finance`);
                setFinance(response.finance);
            } catch (err) {
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [year])

    return (
        <div className="flex flex-col gap-4">
            <div className="w-full">
                <Card>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <span className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>Selecione o ano:</span>
                            <Select onValueChange={value => setYear(value)} value={year}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Ano..." />
                                </SelectTrigger>
                                <SelectContent >
                                    {[...YEARS].map((year: any) => (
                                        <SelectItem key={year} value={year} >{year}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
                <Card className="hover:bg-primary/20 hover:scale-105 cursor-pointer">
                    <Link href='/admin/finance/yearly'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base font-normal flex items-center gap-2">
                                <span className="uppercase font-bold tracking-wider">Anuidade</span>
                                <CreditCard className="w-6 h-6" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AnuityPieChart year={year} finance={finance} isLoading={isLoading}/>
                        </CardContent>
                    </Link>
                </Card>
                <Card className="hover:bg-primary/20 hover:scale-105 cursor-pointer">
                    <Link href='/admin/finance/tournaments'>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-base font-normal flex items-center gap-2">
                                <span className="uppercase font-bold tracking-wider">Inscrição Torneios</span>
                                <Trophy className="w-6 h-6" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TournamentBarChart year={year} finance={finance} isLoading={isLoading}/>
                        </CardContent>
                    </Link>
                </Card>
            </div>
        </div>

    )
}
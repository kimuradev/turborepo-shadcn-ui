'use client'

import isAuth from "@/components/hooks/isAuth"
import { CardsStats } from "./card-stats"

function Page() {
    return (
        <div className="flex flex-1 flex-col">
            <h2 className="font-bold text-lg mb-10">Financeiro - Dashboard</h2>
            <div className="flex justify-center items-center">
                <CardsStats />
            </div>
        </div>
    )
}

export default isAuth(Page)
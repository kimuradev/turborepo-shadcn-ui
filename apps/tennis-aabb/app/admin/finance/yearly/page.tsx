'use client'

import isAuth from "@/components/hooks/isAuth"
import FinanceYearly from "./finance-yearly"
import { CreditCard } from "lucide-react"

function Page() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-4 mb-10">
                <h2 className="font-bold text-lg ">Financeiro - Anuidade</h2>
                <CreditCard className="w-6 h-6 stroke-primary" />
            </div>
            <div className="flex justify-center items-center">
                <FinanceYearly />
            </div>
        </div>
    )
}

export default isAuth(Page)
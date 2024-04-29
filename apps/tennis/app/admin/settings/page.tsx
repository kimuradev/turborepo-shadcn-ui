'use client'

import isAuth from "@/components/hooks/isAuth"
import Finance from "./finance"

function Page() {
    return (
        <div className="flex flex-1 flex-col">
            <h2 className="font-bold text-lg mb-10">Configurações</h2>
            <Finance />
        </div>
    )
}

export default isAuth(Page)
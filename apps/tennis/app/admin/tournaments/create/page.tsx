"use client"

import isAuth from "@/components/hooks/isAuth";
import TournamentForm from "./tournament-form";

function Page() {
    return (
        <div className="flex flex-1 flex-col">
            <h2 className="font-bold text-lg mb-10">Organizar torneio</h2>
            <div className="flex justify-center items-center">
                <TournamentForm />
            </div>
        </div>
    )
}

export default isAuth(Page)


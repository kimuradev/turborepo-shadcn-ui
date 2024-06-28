"use client"

import isAuth from "@/components/hooks/isAuth";
import Player from "./Player";


function Page() {
    return (
        <div className="flex flex-1 flex-col">
            <h2 className="font-bold text-lg mb-10">Cadastrar jogador</h2>
            <div className="flex justify-center items-center">
                <Player/>
            </div>
        </div>
    )

}

export default isAuth(Page)
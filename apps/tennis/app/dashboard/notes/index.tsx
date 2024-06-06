// import { getApi } from "@/lib/fetch";
// import TopTen from "./top-ten";

import { Button } from "@ui/components/ui/button"
import Messages from "./messages"
import { Pencil } from "lucide-react"
import MessageRemoveModal from "./message-remove-modal"
import EmptyMessage from "./empty-message"
import { Pin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/ui/card"

const data = {
    message: "06/06 à 09/06 - Inscrição duplas\n11/06 à 15/06 - Torneio de duplas\n14/06 - Término dos jogos\n15/06 - Churrasco entrega dos troféus e camiseta\n14/06 à 23/06 - Inscrição Wimbledon\n25/06 - Inicio Wimbledon"
}

// const data = ''

export default async function Notes() {
    //   const data = await getApi('/ranking-leader?limit=10', { cache: 'no-store' })


    if (!data) {
        return <EmptyMessage />
    }

    return (
        <>
            <Card className="bg-yellow-200/20 relative">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-normal flex items-center gap-2">
                        <Pin className="w-4 h-4 fill-red-500" />
                        <span className="font-semibold leading-none tracking-tight">Mural de recados</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                    <Messages data={data.message} />
                </CardContent>
            </Card>


        </>
    )
}
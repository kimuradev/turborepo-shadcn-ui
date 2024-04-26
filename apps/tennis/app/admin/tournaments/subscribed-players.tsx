import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@repo/ui/components/ui/accordion"
import PlayerTable from "./player-table"
import { SubscribedPlayersProps } from "@tennis/lib/definitions"

function SubscribedPlayers({ players, ...rest }: { players: SubscribedPlayersProps, tournament: string, year:string }) {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Lista de inscritos: </AccordionTrigger>
                <AccordionContent>
                    <PlayerTable players={players.data} isLoading={players.isLoading} {...rest} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

export default SubscribedPlayers
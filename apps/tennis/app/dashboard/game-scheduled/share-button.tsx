'use client'

import { useAuthContext } from "@/app/context/auth-context";
import { DetailsProps } from "@/lib/definitions";
import { getFormattedDate } from "@/lib/utils";
import { Button } from "@ui/components/ui/button";
import { format } from "date-fns";
import { Share2 } from "lucide-react";

type GameProps = {
    schedule: string, player1: { name: string }, player2: { name: string }
}

type GameDataProps = {
    scheduleDate: string
    games: DetailsProps[]
}

type GameTable = {
    data: GameDataProps[]
}

export default function ShareButton({ data }: GameTable) {
    const { isAdmin } = useAuthContext();

    const formatWhatsAppMessage = () => {
        return data.map((schedule: { scheduleDate: string, games: any }) => {
            const formattedDate = getFormattedDate(schedule.scheduleDate)

            const games = schedule.games.map((game: GameProps) => {
                const gameTime = format(new Date(game.schedule), "HH:mm");
                return `${gameTime} - ${game.player1.name} x ${game.player2.name}`;
            }).join('\n');

            return `*${formattedDate}*\n${games}`;
        }).join('\n\n');
    };

    const shareOnWhatsApp = () => {
        const message = formatWhatsAppMessage();
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div>
            {isAdmin && (
                <Button variant="link" onClick={shareOnWhatsApp} className="absolute top-3 right-2">
                    <div className="relative">
                        <Share2 className="h-5 w-5 stroke-green-400 hover:stroke-green-200 " />
                    </div>
                </Button>
            )}
        </div>
    )
}

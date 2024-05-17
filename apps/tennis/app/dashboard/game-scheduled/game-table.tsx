import { useAuthContext } from "@/app/context/auth-context";
import { getFormattedDate, getNameWithAbbreviation } from "@/lib/utils";
import { Button } from "@ui/components/ui/button";
import { format } from "date-fns";
import { Share2 } from "lucide-react";

type GameTable = {
    data: any
}

export default function GameTable({ data }: GameTable) {
    const { isAdmin } = useAuthContext();

    const formatWhatsAppMessage = () => {
        return data.map((schedule: any) => {
            const formattedDate = getFormattedDate(schedule.scheduleDate)

            const games = schedule.games.map((game: any) => {
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
        <div className="overflow-auto max-h-[400px] w-full">
            {isAdmin && (
                <Button variant="link" onClick={shareOnWhatsApp} className="absolute top-3 right-2">
                    <div className="relative">
                        <Share2 className="h-5 w-5 stroke-green-400 hover:stroke-green-200 " />
                    </div>
                </Button>
            )}
            {data.map((game: any) => {
                return (
                    <div className="flex flex-col gap-1">
                        <div className="bg-secondary font-bold px-2 py-1 rounded">{getFormattedDate(game.scheduleDate)}</div>
                        {game.games.map((item: any) => (
                            <div className="text-sm px-4 py-1">{format(item.schedule, 'HH:mm')} - {getNameWithAbbreviation(item.player1?.name)} x {getNameWithAbbreviation(item.player2?.name)}</div>
                        ))}
                    </div>
                )
            })}
        </div>
    )
}

import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@repo/ui/components/ui/card"
import { Button } from "@repo/ui/components/ui/button";
import { type CardTournamentProps } from "@/lib/definitions";

const CardTournament = ({ title, subtitle, headerSrcImg, contentSrcImg, bgColor, link, subscriptionIsOpen, tournamentId, year, started }: CardTournamentProps) => {
    return (
        <>
            <Card className={`w-[250px] transform transition duration-500 hover:scale-110 ${bgColor}`}>
                <CardHeader className="flex justify-center items-center m-0 p-0" >
                    <div className="py-4 invisible" />
                    <Image src={headerSrcImg} width={250} height={140} alt={contentSrcImg.alt} />
                </CardHeader>
                <CardContent className="flex flex-row justify-between">
                    <Image src={contentSrcImg.src} width={50} height={50} alt={contentSrcImg.alt} />
                    <div className="flex flex-col justify-around">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{subtitle}</CardDescription>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {
                        (started || subscriptionIsOpen) && (
                            <Link href={`/tournaments/subscriptions/?tournamentId=${tournamentId}&year=${year}`} >
                                <Button variant="link" className="text-xs p-2">
                                    <div className="flex items-center justify-center gap-2">
                                        <Users className="h-4 w-4 stroke-primary" />
                                        <span className="text-primary">Ver Inscritos</span>
                                    </div>
                                </Button>
                            </Link>
                        )
                    }
                    {started && (
                        <>
                            <Link href={`${link}?year=${year}`} >
                                <Button variant="secondary" className="text-xs">
                                    Ver torneio
                                </Button>
                            </Link>
                        </>
                    )}
                     <div className="py-4 invisible" />
                </CardFooter>
            </Card >
        </>
    )
}

export default CardTournament;
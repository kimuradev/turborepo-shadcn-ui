"use client"

import Image from "next/image";
import Link from "next/link";
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
import { useAuthContext } from "@/app/context/auth-context";
import TournamentPayment from "@/app/tournaments/tournament-payment";
import clsx from "clsx";
import { Check } from "lucide-react";

const CardTournament = ({ id, title, subtitle, headerSrcImg, contentSrcImg, bgColor, link, year, started, paymentStatus, isSubscribed }: CardTournamentProps) => {
    const { profile, isAdmin, signed } = useAuthContext();

    const renderActionButton = () => {
        if (signed && isSubscribed) {
            return (
                <Button variant="default"
                    className={clsx(
                        `"border border-green-200 bg-green-200 gap-2 text-xs`,
                        {
                            'invisible': isAdmin
                        }
                    )}
                    onClick={() => { }} disabled>
                    <Check className="h-4 w-4 stroke-green-500" />
                    <span className="text-green-700">Inscrito</span>
                </Button>
            )
        } else {
            return <div className="invisible"></div>
        }
    }

    const renderSeeTournamentButton = () => {
        // TODO: remove it when we have doubles format
        if (link !== '/tournaments/ab-doubles' && started) {
            return (
                <Link href={`${link}?year=${year}`} >
                    <Button variant="secondary" className="text-xs">
                        Ver torneio
                    </Button>
                </Link>
            )
        }
    }

    return (
        <>
            <Card className={`w-[250px] transform transition duration-500 hover:scale-110 ${bgColor}`}>
                <CardHeader className="flex justify-center items-center m-0 p-0" >
                    {link !== '/tournaments/ab-doubles' ? (
                        <TournamentPayment email={profile.user} status={paymentStatus} tournamentId={id} year={year} isActive={paymentStatus && signed && !isAdmin} />
                    ) : (
                        <div className="py-4 invisible" />
                    )}
                    <Image src={headerSrcImg} width={250} height={140} alt={contentSrcImg.alt} />
                </CardHeader>
                <CardContent className="flex flex-row justify-between">
                    <Image src={contentSrcImg.src} width={50} height={50} alt={contentSrcImg.alt} />
                    <div className="flex flex-col justify-around">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{subtitle}</CardDescription>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-1">
                    {renderActionButton()}
                    {renderSeeTournamentButton()}
                </CardFooter>
            </Card >
        </>
    )
}

export default CardTournament;
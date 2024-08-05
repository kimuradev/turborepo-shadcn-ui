"use client"

import Image from "next/image";
import clsx from 'clsx';
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
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
import TournamentPayment from "@/app/tournaments/tournament-payment";
import { useAuthContext } from "@/app/context/auth-context";

const CardTournament = ({ id, title, subtitle, headerSrcImg, contentSrcImg, bgColor, link, year, subscriptionIsOpen, started, paymentStatus, isSubscribed, isPaymentPending }: CardTournamentProps) => {
    const { profile, isAdmin, signed } = useAuthContext();
    const router = useRouter();

    const handleSubscribe = () => {
        router.push(`${link}/subscribe?year=${year}`)
    }

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
        }
        else if (signed && !isPaymentPending) {
            return (
                <Button variant="default" className={clsx(
                    `text-xs`,
                    {
                        'invisible': isAdmin
                    }
                )} onClick={handleSubscribe}>
                    Me inscrever
                </Button>
            )
        } 
        else if (signed && isPaymentPending) {
            return (
                <div
                    className={clsx(
                        `"p-0 text-xs`,
                        {
                            'invisible': isAdmin
                        }
                    )}
                    onClick={() => { }}>
                    <p className="text-orange-700">Inscrição bloqueada. Regularizar pagamento</p>
                </div>
            )
        } 
        else {
            // return <p className="text-green-700 pl-2">Efetuar login para inscrição.</p>
            return null
        } 
    }

    return (
        <>
            <Card className={`w-[250px] transform transition duration-500 hover:scale-110 ${bgColor}`}>
                <CardHeader className="flex justify-center items-center m-0 p-0" >
                    {link !== '/tournaments/ab-doubles' ? (
                        <TournamentPayment email={profile.user} status={paymentStatus} tournamentId={id} year={year} isActive={paymentStatus && !started && subscriptionIsOpen && signed && !isAdmin} />
                    ) : (
                        <div className="py-4 invisible"/>
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
                {!started && subscriptionIsOpen && (
                    <CardFooter className="flex justify-between gap-1">
                        {renderActionButton()}
                    </CardFooter>
                )}
            </Card >
        </>
    )
}

export default CardTournament;
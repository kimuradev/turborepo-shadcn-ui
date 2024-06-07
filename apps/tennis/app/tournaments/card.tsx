"use client"

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { Dialog, DialogContent } from "@repo/ui/components/ui/dialog";
import { type CardTournamentProps } from "@/lib/definitions";


import LoginForm from "../login/login-form";
import { useAuthContext } from "../context/auth-context";
import TournamentPayment from "./tournament-payment";

const CardTournament = ({ id, title, subtitle, headerSrcImg, contentSrcImg, bgColor, link, year, subscriptionIsOpen, started, subscription, isPaymentPending }: CardTournamentProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { profile, isAdmin, signed } = useAuthContext();
    const router = useRouter();

    const handleConfirmLogin = () => {
        setIsOpen(false)
    }

    const handleSubscribe = () => {
        if (!signed) {
            setIsOpen(true)
        } else {
            router.push(`${link}/subscribe?year=${year}`)
        }
    }

    const renderSeeTournamentButton = () => {
        if (link !== '/tournaments/ab-doubles') {
            return (
                <Link href={`${link}?year=${year}`} >
                    <Button variant="secondary" className="text-xs">
                        Ver torneio
                    </Button>
                </Link>
            )
        }
    }

    const renderActionButton = () => {
        if (subscription) {
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
        else if (isPaymentPending) {
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
    }

    return (
        <>
            <Card className={`w-[250px] transform transition duration-500 hover:scale-110 ${bgColor}`}>
                <CardHeader className="flex justify-center items-center m-0 p-0" >
                    {link !== '/tournaments/ab-doubles' ? (
                        <TournamentPayment email={profile.user} status={subscription?.payment_status} tournamentId={id} year={year} isActive={subscription && !started && subscriptionIsOpen && signed && !isAdmin} />
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
                {!started && subscriptionIsOpen ? (
                    <CardFooter className="flex justify-between gap-1">
                        {renderActionButton()}
                        {renderSeeTournamentButton()}
                    </CardFooter>
                ) : (
                    <CardFooter className="flex justify-end">
                        {renderSeeTournamentButton()}
                    </CardFooter>
                )}
            </Card >

            <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
                <DialogContent className="sm:max-w-[425px]">
                    <LoginForm handleCancel={handleConfirmLogin} />
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CardTournament;
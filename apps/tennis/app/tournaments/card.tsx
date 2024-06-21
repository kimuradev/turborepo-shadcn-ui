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

const CardTournament = ({ title, subtitle, headerSrcImg, contentSrcImg, bgColor, link, year, started }: CardTournamentProps) => {
    return (
        <>
            <Card className={`w-[250px] transform transition duration-500 hover:scale-110 ${bgColor}`}>
                <CardHeader className="flex justify-center items-center m-0 p-0" >
                    <Image src={headerSrcImg} width={250} height={140} alt={contentSrcImg.alt} />
                </CardHeader>
                <CardContent className="flex flex-row justify-between">
                    <Image src={contentSrcImg.src} width={50} height={50} alt={contentSrcImg.alt} />
                    <div className="flex flex-col justify-around">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{subtitle}</CardDescription>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    {started && (
                        <Link href={`${link}?year=${year}`} >
                            <Button variant="secondary" className="text-xs">
                                Ver torneio
                            </Button>
                        </Link>
                    )}
                </CardFooter>
            </Card >
        </>
    )
}

export default CardTournament;
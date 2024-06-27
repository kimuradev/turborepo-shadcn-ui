import { useState } from "react"
import Image from "next/image"
import { format } from "date-fns"
import { Trash2 } from "lucide-react"

import { useAuthContext } from "@/app/context/auth-context"
// import JapanFlag from "@/public/static/japan-flag.svg"
import BrazilFlag from "@/public/static/br-flag.svg"
import { type CardProps } from "@/lib/definitions"
import { getNameWithAbbreviation } from "@/lib/utils"
import { DATE_TIME_FORMAT, GAME_FLOW_SORTED, GAME_FLOW_WO } from "@/lib/constants"
import { Button } from "@ui/components/ui/button"
import DialogResult from "./dialog"
import RemoveResultModal from "./remove-result-modal"
import TournamentDatePicker from "../datepicker"

export default function Card({ data, classification }: CardProps) {
    const { signed, isAdmin } = useAuthContext();
    const [dialog, setDialog] = useState({
        isLoading: false,
        isOpen: false,
        isRemoveModalOpen: false,
        data: {
            id: '',
            name: ''
        },
        removeData: {
            player1: '',
            player2: '',
            player1_score: '',
            player2_score: '',
            player1_id: '',
            player2_id: ''
        }
    })

    const handleCancel = () => {
        setDialog(state => ({
            ...state,
            isOpen: false
        }))
    }

    const handleOpenDialog = (value: any) => {
        setDialog(state => ({
            ...state,
            data: value,
            isOpen: true
        }))
    }

    const cardBackground = (type: string) => {
        switch (type) {
            case 'winner':
                return 'bg-green-200'
            case 'loser':
                return 'bg-red-200'
            default:
                return 'bg-slate-200'
        }
    }

    const enableToEditCard = (game: any) => (((game.player1_id && game.player2_id) && (!game.player1_score && !game.player2_score))
        || (signed && isAdmin && ((game.player1_score !== null && game.player2_score !== null))))

    const enableHover = (game: any) => {
        if (((game.player1_id && game.player2_id) && (!game.player1_score && !game.player2_score))
            || (signed && isAdmin && ((game.player1_score !== null && game.player2_score !== null)))) return 'hover:cursor-pointer hover:scale-110 '
        return '';
    }

    const enableOpenForm = (game: any) => {
        if (((game.player1_id && game.player2_id) && (!game.player1_score && !game.player2_score))
            || (signed && isAdmin && ((game.player1_score !== null && game.player2_score !== null)))) return handleOpenDialog(game);
        return {}
    }

    const getPlayerScore = ({ flow, score }: { flow: string, score: number }) => {
        if (flow === GAME_FLOW_WO || flow === GAME_FLOW_SORTED) {
            if (score === 2) return 'W';
            return 'L'
        }
        return score
    }

    const handleCloseRemoveResultModal = () => {
        setDialog(state => ({
            ...state,
            isRemoveModalOpen: false,
        }))
    }


    const handleRemoveResultModal = (game: any) => {
        setDialog(state => ({
            ...state,
            isRemoveModalOpen: true,
            removeData: {
                ...game
            }
        }))
    }

    return (
        <>
            {data.map((game: any, index) => (
                <div key={game.game_number}
                    className={`flex flex-col items-center ${game.round === 'final' ? 'border' : cardBackground(game.type)} w-60 rounded-sm m-4 p-1 ${enableHover(game)}} w-[270px]`}
                >

                    <TournamentDatePicker id={game.id} schedule={game.schedule} isDisabled={!enableToEditCard(game)} />

                    <div className="flex justify-around p-2 w-full" onClick={() => enableOpenForm(game)}>
                        <div className="flex flex-col justify-center items-center">
                            <p className="mr-2 text-xs text-muted-foreground">#{game.game_number}</p>
                            {classification && <p className="mr-2 mt-2 text-xs text-muted-foreground">{classification[index]}</p>}
                        </div>
                        <div className="flex flex-col justify-around">
                            <div className="flex items-center">
                                <div className="w-[20px]">
                                    <Image src={BrazilFlag} width={20} height={15} alt="Brasil" />
                                </div>
                                <div className="pl-2 w-[170px]">
                                    <p className="text-xs truncate">{getNameWithAbbreviation(game.player1)}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="w-[20px]">
                                    <Image src={BrazilFlag} width={20} height={15} alt="Brasil" />
                                </div>
                                <div className="pl-2 w-[170px]">
                                    <p className="text-xs truncate">{getNameWithAbbreviation(game.player2)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center gap-2">
                            <div className="flex w-6 h-6 bg-slate-100 rounded justify-center items-center">
                                <p>{getPlayerScore({ flow: game.flow, score: game.player1_score })}</p>
                            </div>
                            <div className="flex w-6 h-6 bg-slate-100 rounded justify-center items-center">
                                <p>{getPlayerScore({ flow: game.flow, score: game.player2_score })}</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                        {game.flow === GAME_FLOW_WO && (
                            <span className="italic">* W.O.</span>
                        )}
                        {game.flow === GAME_FLOW_SORTED && (
                            <span className="italic">* Sorteado {format(game.updated_at, DATE_TIME_FORMAT)}</span>
                        )}
                    </div>

                    {isAdmin && game.round !== 'final' && game.player1_score !== null && game.player2_score !== null && (
                        <Button variant="link" className="text-xs flex gap-2" onClick={() => handleRemoveResultModal(game)}>
                            <Trash2 className="h-4 w-4 stroke-primary" />
                            <span>Remover resultado</span>
                        </Button>
                    )}
                </div>
            ))}
            <DialogResult isOpen={dialog.isOpen} data={dialog.data} handleCancel={handleCancel} />
            <RemoveResultModal isOpenModal={dialog.isRemoveModalOpen} data={dialog.removeData} handleCancelModal={handleCloseRemoveResultModal}/>
        </>
    )
}
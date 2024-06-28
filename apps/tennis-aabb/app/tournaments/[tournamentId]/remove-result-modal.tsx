"use client"

import { useEffect, useState } from 'react';
import { Button } from "@repo/ui/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@repo/ui/components/ui/dialog"

import { putApiWithCredentials } from "@/lib/fetchWithCredentials";
import useToastMessage from "@ui/components/hooks/useToastMessage";
import { ButtonLoading } from "@ui/components/ui/button-loading";
import { getNameWithAbbreviation } from '@/lib/utils';
import { useAppContext } from '@/app/context/app-context';

type RemoveResultModal = {
    isOpenModal: boolean,
    data: any,
    handleCancelModal: () => void,
}

export default function RemoveResultModal({ isOpenModal, data, handleCancelModal }: RemoveResultModal) {
    const { updateGameResult } = useAppContext();
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(isOpenModal);
    const { successMessage, errorMessage } = useToastMessage();

    useEffect(() => {
        setIsOpen(isOpenModal)
    }, [isOpenModal])

    const handleCancel = () => {
        setIsOpen(false)
        handleCancelModal();
    }

    const handleRemove = async () => {
        setIsLoading(true);
        try {
            const { id: game_id, player1_id, player2_id, round: current_round } = data;
            const response = await putApiWithCredentials('/games/remove-result', { game_id, player1_id, player2_id, current_round });

            if (!response.success) {
                errorMessage(response)
                return;
            }

            successMessage({ title: 'Remover resultado', description: 'Resultado removido com sucesso' });
            updateGameResult(response)
        } catch (err) {
            errorMessage();
        } finally {
            setIsLoading(false)
            handleCancel();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleCancel}>
            <DialogContent className="sm:max-w-[425px]">
                <div className='flex flex-col space-y-1.5 text-center sm:text-left'>
                    <h2 className='text-lg font-semibold leading-none tracking-tight'>
                        Remover resultado
                    </h2>
                    <div className='flex flex-col py-4 gap-2'>
                        <p className='text-sm text-muted-foreground'>Jogo: {data.game_number}</p>
                        <span>{getNameWithAbbreviation(data.player1)} <strong>{data.player1_score}</strong> <strong> x {data.player2_score} </strong>{getNameWithAbbreviation(data.player2)} </span>
                    </div>
                    <p className='text-sm text-muted-foreground'>Tem certeza que deseja remover esse resultado?</p>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
                    {isLoading ? <ButtonLoading /> : <Button onClick={handleRemove}>Remover</Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

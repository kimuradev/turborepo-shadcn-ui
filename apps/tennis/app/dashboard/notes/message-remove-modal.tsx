"use client"

import { Button } from "@repo/ui/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@repo/ui/components/ui/dialog"

import { useEffect, useState } from 'react';
import { putApiWithCredentials } from "@/lib/fetchWithCredentials";
import useToastMessage from "@ui/components/hooks/useToastMessage";
import { ButtonLoading } from "@ui/components/ui/button-loading";

type MessageRemoveModal = {
    isOpenModal: boolean,
    handleCancelModal: () => void,
    handleComplete: () => void
}

export default function MessageRemoveModal({ isOpenModal, handleCancelModal, handleComplete }: MessageRemoveModal) {
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
        try {
            const response = await putApiWithCredentials('/notes/remove', { active: false });

            if (response.success) {
                successMessage({ title: 'Remover mural', description: 'Mural removido com sucesso' });
            }

            setIsOpen(false)
            handleComplete();
        } catch (err) {
            errorMessage();
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleCancel}>
            <DialogContent className="sm:max-w-[425px]">
                <div className='flex flex-col space-y-1.5 text-center sm:text-left'>
                    <h2 className='text-lg font-semibold leading-none tracking-tight'>
                        Remover mural
                    </h2>
                    <p className='text-sm text-muted-foreground'>Tem certeza que deseja remover esse mural com todos os recados?</p>
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={handleCancel}>Cancelar</Button>
                    {isLoading ? <ButtonLoading /> : <Button onClick={handleRemove}>Remover</Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

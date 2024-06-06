"use client"

import { Button } from "@repo/ui/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
} from "@repo/ui/components/ui/dialog"
import Spinner from '@repo/ui/components/ui/spinner';

import { Suspense, useEffect, useState } from 'react';
import { useAuthContext } from '@/app/context/auth-context';

type MessageRemoveModal = {
    isOpenRemoveModal: boolean,
    handleCancelRemoveModal: () => void
}

export default function MessageRemoveModal({ isOpenRemoveModal, handleCancelRemoveModal }: MessageRemoveModal) {
    const [isOpen, setIsOpen] = useState(isOpenRemoveModal);

    useEffect(() => {
        setIsOpen(isOpenRemoveModal)
    }, [isOpenRemoveModal])

    const handleCancel = () => {
        setIsOpen(false)
        handleCancelRemoveModal();
    }

    const handleRemove = () => {
        setIsOpen(false)
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
                    <Button variant="secondary" onClick={handleCancel}> Cancelar </Button>
                    <Button onClick={handleRemove}> Remover </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

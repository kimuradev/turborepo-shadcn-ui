"use client"

import { Pencil } from 'lucide-react';

import { Button } from "@repo/ui/components/ui/button"
import {
    Dialog,
    DialogContent,
} from "@repo/ui/components/ui/dialog"
import Spinner from '@repo/ui/components/ui/spinner';

import Tournament from './tournament';
import { Suspense, useEffect, useState } from 'react';
import { useAuthContext } from '@/app/context/auth-context';

export default function TournamentModal({ modalIsOpen, handleClose }: { modalIsOpen?: boolean, handleClose: () => void }) {
    const [isOpen, setIsOpen] = useState(modalIsOpen || false);
    const { signed, isAdmin } = useAuthContext();

    useEffect(() => {
        setIsOpen(modalIsOpen || false)
    }, [modalIsOpen])

    const handleCancel = () => {
        setIsOpen(false)
        handleClose();
    }

    return (
        <>
            {signed && isAdmin && (
                <>
                    <Button className='absolute top-3 right-2' variant="ghost" onClick={() => setIsOpen(true)}>
                        <Pencil className="h-4 w-4 stroke-primary/90" />
                    </Button>
                    <Dialog open={isOpen} onOpenChange={handleCancel}>
                        <DialogContent className="sm:max-w-[425px]">
                            <div className='flex flex-col space-y-1.5 text-center sm:text-left'>
                                <h2 className='text-lg font-semibold leading-none tracking-tight'>
                                    Abrir inscrição torneio
                                </h2>
                                <p className='text-sm text-muted-foreground'>Selecione o torneio que você quer abrir as inscrições.</p>
                            </div>
                            <Suspense fallback={<div className="flex justify-center"><Spinner /></div>}>
                                <Tournament handleCloseModal={handleCancel} />
                            </Suspense>
                        </DialogContent>
                    </Dialog>
                </>
            )}
        </>

    )
}

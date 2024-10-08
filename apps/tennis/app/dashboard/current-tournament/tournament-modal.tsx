"use client"

import { Pencil } from 'lucide-react';

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import Spinner from '@/components/ui/spinner';

import Tournament from './tournament';
import { Suspense, useState } from 'react';

export default function TournamentModal() {
    const [isOpen, setIsOpen] = useState(false);

    const handleCancel = () => {
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleCancel}>
            <Button className='absolute right-1' variant="ghost" onClick={() => setIsOpen(true)}>
                <Pencil className="h-4 w-4 stroke-orange-300" />
            </Button>
            <DialogContent className="sm:max-w-[425px]">
                <div className='flex flex-col space-y-1.5 text-center sm:text-left'>
                    <h2 className='text-lg font-semibold leading-none tracking-tight'>
                        Ativar torneio
                    </h2>
                    <p className='text-sm text-muted-foreground'>Selecione o torneio que você quer deixar ativo.</p>
                </div>
                <Suspense fallback={<div className="flex justify-center"><Spinner /></div>}>
                    <Tournament handleCloseModal={handleCancel} />
                </Suspense>
            </DialogContent>
        </Dialog>
    )
}

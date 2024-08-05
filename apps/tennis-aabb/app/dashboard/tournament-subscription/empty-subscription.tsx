'use client'

import { useAuthContext } from "@/app/context/auth-context";
import { Button } from "@ui/components/ui/button";
import TournamentModal from "./tournament-modal";
import { useState } from "react";

export default function EmptySubscription() {
    const { isAdmin, signed } = useAuthContext()
    const [modalIsOpen, setModalIsOpen] = useState(false)

    return (
        <>
            {
                isAdmin && signed && (
                    <div className="border rounded border-dashed border-primary min-h-[240px] flex items-center justify-center relative">
                        <Button variant="link" onClick={() => setModalIsOpen(true)}>Abrir inscrição de torneio</Button>
                        <TournamentModal modalIsOpen={modalIsOpen} handleClose={() => setModalIsOpen(false)}/>
                    </div>
                )
            }
        </>
    )



}
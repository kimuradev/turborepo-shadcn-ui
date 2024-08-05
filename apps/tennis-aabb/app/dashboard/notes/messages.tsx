'use client'

import { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";

import { useAuthContext } from "@/app/context/auth-context";
import { type NoteProps } from "@/lib/definitions";
import { Button } from "@ui/components/ui/button";
import MessageForm from "./message-form";
import MessageRemoveModal from "./message-remove-modal";

type MessageProps = {
    data: NoteProps | null,
    handleCancel: () => void,
    handleComplete: () => void,
    resetComplete: () => void
}

export default function Messages({ data, handleCancel, handleComplete, resetComplete }: MessageProps) {
    const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { signed, isAdmin } = useAuthContext();

    useEffect(() => {
        if (!data || !data.active) {
            setIsEditing(true)
        }
    }, [data])

    const handleCompleteModal = () => {
        handleComplete();
    }

    const handleEditModal = () => {
        setIsEditing(state => !state)
        resetComplete();
    }

    const handleOpenRemoveModal = () => {
        setIsOpenRemoveModal(true)
        resetComplete();
    }

    const handleCancelModal = () => {
        setIsOpenRemoveModal(false)
    }

    const handleCancelForm = () => {
        setIsEditing(false)
        handleCancel()
    }

    const handleCompleteForm = () => {
        setIsEditing(false)
        handleComplete();
    }

    return (
        <>
            {signed && isAdmin && (
                <>
                    <div className="flex gap-1 absolute top-3 right-2">
                        <Button variant="ghost" onClick={handleEditModal}>
                            <Pencil className="h-4 w-4 stroke-primary/90" />
                        </Button>

                        <Button variant="ghost" onClick={() => handleOpenRemoveModal()}>
                            <X className="h-4 w-4 stroke-red-500" />
                        </Button>
                    </div>
                    <MessageRemoveModal
                        isOpenModal={isOpenRemoveModal}
                        handleCancelModal={() => handleCancelModal()}
                        handleComplete={handleCompleteModal} />
                </>
            )}

            {isEditing ? (
                <MessageForm data={data?.message} handleCancel={handleCancelForm} handleComplete={handleCompleteForm} />
            ) : (
                <pre className="text-sm">
                    {data?.message}
                </pre>
            )}
        </>
    )
}
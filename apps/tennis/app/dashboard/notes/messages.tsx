// import { getApi } from "@/lib/fetch";
// import TopTen from "./top-ten";

'use client'

import { useAuthContext } from "@/app/context/auth-context";
import { Button } from "@ui/components/ui/button";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import MessageForm from "./message-form";
import MessageRemoveModal from "./message-remove-modal";

type Messages = {
    message: string
}

export default function Messages({ data }: { data: string }) {
    //   const data = await getApi('/ranking-leader?limit=10', { cache: 'no-store' })
    const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { signed, isAdmin } = useAuthContext();

    const handleRemove = () => {
        setIsOpenRemoveModal(true)
    }

    const handleCancelRemoveModal = () => {
        setIsOpenRemoveModal(false)
    }

    return (
        <>
            {signed && isAdmin && (
                <>
                    <div className="flex gap-1 absolute top-3 right-2">
                        <Button variant="ghost" onClick={() => setIsEditing(state => !state)}>
                            <Pencil className="h-4 w-4 stroke-primary/90" />
                        </Button>

                        <Button variant="ghost" onClick={() => handleRemove()}>
                            <X className="h-4 w-4 stroke-red-500" />
                        </Button>
                    </div>
                    <MessageRemoveModal isOpenRemoveModal={isOpenRemoveModal} handleCancelRemoveModal={() => handleCancelRemoveModal()} />
                </>
            )}

            {isEditing ? (
                <MessageForm />
            ) : (
                <pre className="text-sm">
                    {data}
                </pre>
            )}
        </>
    )
}
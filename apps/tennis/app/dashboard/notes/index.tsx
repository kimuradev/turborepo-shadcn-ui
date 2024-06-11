'use client'

import { Pin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/ui/card"
import { getApi } from "@/lib/fetch"

import Messages from "./messages"
import EmptyMessage from "./empty-message"
import { useEffect, useState } from "react"
import { type NoteProps } from "@/lib/definitions"
import { NotesSkeleton } from "@/components/skeletons"

export default function Notes() {
    const [data, setData] = useState<NoteProps | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await getApi('/notes', { cache: 'no-store' })
                setData(response);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])

    useEffect(() => {
        if (!isComplete) return;
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await getApi('/notes', { cache: 'no-store' })
                setData(response);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [isComplete])

    const resetComplete = () => {
        setIsComplete(false)
    }

    const handleCancel = () => {
        setIsAdding(false)
        resetComplete();
    }

    const handleComplete = () => {
        setIsAdding(false)
        setIsComplete(true)
    }

    const handleAddNotes = () => {
        setIsAdding(true)
        resetComplete();
    }

    if (isLoading) {
        return <div><NotesSkeleton /></div>
    }

    if ((!data || !data.active) && !isAdding) {
        return <EmptyMessage handleAdd={handleAddNotes} />
    }

    return (
        <>
            <Card className="bg-yellow-200/20 relative">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-base font-normal flex items-center gap-2">
                        <Pin className="w-4 h-4 fill-red-500" />
                        <span className="font-semibold leading-none tracking-tight">Mural de recados</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="px-6 overflow-auto max-h-[220px]">
                    {data && <Messages data={data} handleCancel={handleCancel} handleComplete={handleComplete} resetComplete={resetComplete}/>}
                </CardContent>
            </Card>
        </>
    )
}
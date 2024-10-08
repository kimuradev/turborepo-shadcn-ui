import { useState } from "react"

import { DateTimePicker } from "@/components/ui/datetime-picker"
import { Separator } from "@/components/ui/separator"
import { deleteApi, putApi } from "@/lib/fetch"
import useToastMessage from "@/components/hooks/useToastMessage"

export default function TournamentDatePicker({ id, schedule }: { id: Number, schedule: Date | null }) {
    const [dateTime, setDateTime] = useState<any>({
        date: schedule ? new Date(schedule) : null,
        hasTime: schedule ? true : false,
        hasSchedule: schedule ? true : false
    })

    const { successMessage, errorMessage } = useToastMessage();

    const handleDatePickerDialog = async () => {
        try {
            const response = await putApi('/games/schedule', {
                game_id: id,
                schedule: dateTime.date
            });
    
            const { data } = response;
            setDateTime({ date: new Date(data), hasTime: dateTime.hasTime, hasSchedule: true });

            successMessage({ 
                title: 'Adicionar data',
                description: 'Data do jogo atualizada com sucesso.'
            })
        } catch (err) {
            errorMessage();
        }
    }

    const handleRemoveDate = async () => {
        try {
            await deleteApi(`/games/schedule/${id}`);
    
            setDateTime({ date: null, hasTime: false, hasSchedule: false });

            successMessage({ 
                title: 'Remover data',
                description: 'Data do jogo removida com sucesso.'
            })
        } catch (err) {
            errorMessage();
        }
    }

    return (
        <>
            <div className="flex justify-center items-center w-full">
                <DateTimePicker onChange={(value: any) => setDateTime(value)} value={dateTime} hasSchedule={dateTime.hasSchedule} handleDatePickerDialog={handleDatePickerDialog} handleRemoveDate={handleRemoveDate} />
            </div>
            <Separator className="w-[210px] mr-2 ml-2 bg-gray-300" />
        </>
    )
}
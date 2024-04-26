import { useState } from "react";
import { format, parse } from "date-fns";
import { Pencil, Check, X, CalendarPlus } from "lucide-react";

import { useAuthContext } from "@tennis/app/context/auth-context";
import { DatePicker } from "@repo/ui/components/ui/date-picker";
import { Separator } from "@repo/ui/components/ui/separator";
import { Button } from "@repo/ui/components/ui/button";
import Spinner from "@repo/ui/components/ui/spinner";
import useToastMessage from "@tennis/components/hooks/useToastMessage";
import { DATE_FORMAT } from "@tennis/lib/constants";
import { type GameWeekProps } from "@tennis/lib/definitions";
import { putApiWithCredentials } from "@tennis/lib/fetchWithCredentials";

export default function GameWeek({ id, week }: GameWeekProps) {
    const { signed, isAdmin } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [currentWeek, setCurrentWeek] = useState(week);
    const [currentDate, setCurrentDate] = useState('');

    const [isEditing, setIsEditing] = useState([false, false, false, false])

    const { errorMessage } = useToastMessage();

    const handleAdd = () => {
        const date = format(new Date(), DATE_FORMAT)
        setCurrentWeek([date, date, date, date])
    }

    const handleEdit = (index: any) => {
        const edit = isEditing.map((c, i) => {
            if (i === index) {
                return true;
            } else {
                return c;
            }
        });
        setIsEditing(edit);
    }

    const handleCancel = (index: any) => {
        const edit = isEditing.map((c, i) => {
            if (i === index) {
                return false;
            } else {
                return c;
            }
        });
        setIsEditing(edit);
    }

    const handleSubmit = async (index: number) => {
        setIsLoading(true);

        try {
            let gameWeek = [...currentWeek];
            gameWeek[index] = currentDate;

            const response = await putApiWithCredentials('/games/week', {
                id: id,
                week: gameWeek
            });

            const { data } = response;
            setCurrentWeek(data);

        } catch (err) {
            errorMessage();
        } finally {
            setIsLoading(false)
        }

        setCurrentDate('')
        handleCancel(index)
    }

    if (!currentWeek.length && !signed) {
        return null;
    }

    if (!currentWeek.length && signed && isAdmin) {
        return (
            <div className="flex flex-col flex-start">
                <Separator className="w-[1200px]" />

                <Button variant="link" className="flex justify-start m-4 p-0 gap-2" onClick={() => { handleAdd() }}>
                    <CalendarPlus className="w-4 h-4" />
                    <span>Adicionar datas</span>
                </Button>

                <Separator className="w-[1200px]" />
            </div>
        )

    }

    return (
        <>
            <Separator className="w-[1200px]" />

            <div className="flex justify-around mt-4 mb-4 w-[1200px]">
                {currentWeek.map((week, index) => (
                    <div key={`${week}-${index}`} className="flex items-center text-sm text-muted-foreground text-center gap-2">
                        <span>até </span>
                        {signed && isAdmin ? (
                            <div className="flex justify-center items-center">
                                {isEditing[index] ? (
                                    <>
                                        <DatePicker pickDate={parse(currentWeek[index], DATE_FORMAT, new Date())} setCurrentDate={setCurrentDate} />
                                        {isLoading ? (<div className="pl-3"><Spinner size="sm" /></div>) : (
                                            <div>
                                                <Button variant="ghost" className="m-1 p-0 pl-1" onClick={() => { handleSubmit(index) }} disabled={!currentDate}>
                                                    <Check className="w-4 h-4 stroke-green-400" />
                                                </Button>
                                                <Button variant="ghost" className="m-1 p-0" onClick={() => { handleCancel(index) }}>
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        )}

                                    </>
                                ) : (
                                    <>
                                        <div> {week}</div>
                                        <Button variant="ghost" onClick={() => { handleEdit(index) }}>
                                            <Pencil className="w-4 h-4 stroke-orange-400" />
                                        </Button>
                                    </>
                                )}
                            </div>
                        ) :
                            (<> {week}</>)}
                    </div>
                ))}
            </div>

            <Separator className="w-[1200px]" />
        </>
    )
}
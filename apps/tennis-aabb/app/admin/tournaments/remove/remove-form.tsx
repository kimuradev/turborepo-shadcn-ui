"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/ui/select"
import { useAppContext } from "@/app/context/app-context";
import useToastMessage from "@repo/ui/components/hooks/useToastMessage";
import { removeTournament } from "@/lib/actions";
import { Button } from "@ui/components/ui/button";
import { ButtonLoading } from "@ui/components/ui/button-loading";
import { DialogDescription } from "@ui/components/ui/dialog";

type RemoveTournamentForm = {
    data: any,
    handleCancel: () => void
}

export default function RemoveTournamentForm({ data, handleCancel }: RemoveTournamentForm) {
    const { successMessage, errorMessage } = useToastMessage();
    const { classes } = useAppContext();

    const formSchema = z.object({
        classId: z.string().min(1, { message: 'Campo obrigatório' }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            classId: '',
        },
    });

    async function formAction() {
        const validFields = await form.trigger();

        if (validFields) {
            const { year, key } = data;

            const response = await removeTournament({ key, year, classId: form.getValues("classId") })

            if (response?.error) {
                errorMessage(response);
                return;
            }

            successMessage({ title: "Remover torneio.", description: "Torneio removido com sucesso!", })
            handleCancel();
        }
    }

    return (
        <div className="w-full">
            <Form {...form}>
                <form
                    action={async () => await formAction()}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="classId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Selecione a classe que deseja remover: </FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Classe..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {classes.map((cls: any) => (
                                                <SelectItem key={cls.id} value={cls.id.toString()}>{cls.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogDescription className="mb-4">
                        Você tem certeza que deseja <strong>remover</strong> esse torneio?
                        Esse torneio <strong>não poderá ser acessado</strong> no futuro.
                    </DialogDescription>
                    <DialogButtons handleCancel={handleCancel} />
                </form>
            </Form>
        </div>
    )
}

function DialogButtons({ handleCancel }: { handleCancel: () => void }) {
    const { pending } = useFormStatus();

    return (
        <div className="flex justify-end gap-2">
            <Button onClick={handleCancel} variant="ghost">Cancelar</Button>
            {!pending ? <Button type="submit">Remover</Button> : <ButtonLoading />}
        </div>
    )
}
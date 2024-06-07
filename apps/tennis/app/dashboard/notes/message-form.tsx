"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@ui/components/ui/form"
import { Textarea } from "@ui/components/ui/textarea"
import { Button } from "@ui/components/ui/button"
import { putApiWithCredentials } from "@/lib/fetchWithCredentials"
import useToastMessage from "@ui/components/hooks/useToastMessage"
import { ButtonLoading } from "@ui/components/ui/button-loading"

const FormSchema = z.object({
    message: z
        .string().min(1, { message: 'Este campo é obrigatório.' })
})

type MessageFormProps = {
    data: string,
    handleCancel: () => void,
    handleComplete: () => void
}

export default function MessageForm({ data, handleCancel, handleComplete }: MessageFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { successMessage, errorMessage } = useToastMessage()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            setIsLoading(true)
            const response = await putApiWithCredentials('/notes', { message: data.message});
            if (response.success) {
                successMessage({ title: 'Mural de recados', description: 'Adicionado com sucesso' })
            }

            handleComplete();
        } catch (err) {
            errorMessage();
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/3 space-y-6">
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Recados</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    placeholder="Digite aqui os recados para o mural."
                                    className="resize-none"
                                    defaultValue={data}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-2 justify-end">
                    <Button variant="secondary" type="button" onClick={() => handleCancel()}>Cancelar</Button>
                    {isLoading ? <ButtonLoading /> : <Button type="submit">Salvar</Button>}
                </div>

            </form>
        </Form>
    )
}
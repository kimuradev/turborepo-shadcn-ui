"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@ui/components/ui/form"
import { Textarea } from "@ui/components/ui/textarea"
import { Button } from "@ui/components/ui/button"

const FormSchema = z.object({
    message: z
        .string().min(1, { message: 'Este campo é obrigatório.' })

})

export default function MessageForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {

        console.log('{JSON.stringify(data, null, 2)}: ', JSON.stringify(data, null, 2))
        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        // })
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
                                    placeholder="Digite aqui os recados para o mural."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-end">
                    <Button type="submit">Salvar</Button>
                </div>

            </form>
        </Form>
    )
}
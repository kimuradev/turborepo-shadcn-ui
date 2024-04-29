"use client"

import { useFormStatus } from 'react-dom';
import { UseFormReturn, useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { ButtonLoading } from '@repo/ui/components/ui/button-loading';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import useToastMessage from '@repo/ui/components/hooks/useToastMessage';
import { forgotUser } from '@/lib/actions';

const formSchema = z.object({
    email: z.string().email({ message: "E-mail inválido" }).min(1, { message: "Campo obrigatório" }),
})

function ForgotForm() {
    const { successMessage, errorMessage } = useToastMessage();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function formAction(formData: FormData) {
        const validFields = await form.trigger();

        if (validFields) {
            const response = await forgotUser(formData);

            if (response?.error) {
                errorMessage(response)
                return;
            }

            form.reset();

            successMessage({
                title: "Esqueci minha senha",
                description: "Link enviado para o e-mail cadastrado. O recebimento pode levar até 5 minutos."
            })
        }
    }

    const handleBlur = (form: UseFormReturn<{
        email: string;
    }, any, undefined>) => {
        form.trigger();
    }

    return (
        <div className='w-full md:w-[400px]'>
            <Form {...form}>
                <form action={async (formData) => await formAction(formData)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" type='email' {...field} onBlur={() => handleBlur(form)} />
                                </FormControl>
                                <FormDescription>
                                    Digite seu e-mail para recuperar sua senha.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SaveButton />
                </form>
            </Form>
        </div>
    )
}


function SaveButton() {
    const { pending } = useFormStatus();
    return (
        <div className='flex justify-end'>
            {!pending ? <Button type="submit">Enviar e-mail</Button> : <ButtonLoading />}
        </div>
    )
}

export default ForgotForm;
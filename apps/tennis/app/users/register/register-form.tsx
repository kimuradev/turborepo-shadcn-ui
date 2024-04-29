"use client"

import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";

import { Button } from "@repo/ui/components/ui/button";
import { ButtonLoading } from '@repo/ui/components/ui/button-loading';
import { Form } from "@repo/ui/components/ui/form";
import useToastMessage from '@repo/ui/components/hooks/useToastMessage';
import { registerUser } from '@/lib/actions';


import LoginForm from '../login-form';

const formSchema = z.object({
    cpf: z.string().min(1, { message: "Campo obrigatório" }),
    email: z.string().email({ message: "E-mail inválido" }).min(1, { message: "Campo obrigatório" }),
    password: z.string().min(1, { message: "Campo obrigatório" }),
    confirm_password: z.string().min(1, { message: "Campo obrigatório" })
})
    .superRefine((arg, ctx) => {
        if (arg.confirm_password !== arg.password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Senha não confere",
                path: ["confirm_password"]
            });
        }

        return z.NEVER;
    })

function RegisterForm() {
    const { successMessage, errorMessage } = useToastMessage();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cpf: "",
            email: "",
            password: "",
            confirm_password: ""
        },
    })

    async function formAction(formData: FormData) {
        const validFields = await form.trigger();

        if (validFields) {
            const response = await registerUser(formData);

            if (response?.error) {
                errorMessage(response)
                return;
            }

            form.reset();

            successMessage({
                title: "Usuário cadastrado com sucesso.",
                description: "Valide seu usuário através do link enviado por e-mail. O recebimento pode levar até 5 minutos."
            })

            redirect('/')
        }
    }

    const handleBlur = (form: any) => {
        form.trigger();
    }

    return (
        <div className='w-full md:w-[400px]'>
            <div className='border rounded-md border-slate-300 w-full p-4 overflow-hidden'>
                <Form {...form}>
                    <form action={async (formData) => await formAction(formData)} className="flex flex-col space-y-8 justify-center h-full w-full">
                        <div className='flex flex-col md:flex-row gap-8'>
                            <LoginForm form={form} handleBlur={handleBlur} showCpf={true}/>
                        </div>

                        <SaveButton />
                    </form>
                </Form>
            </div>
        </div>
    )
}


function SaveButton() {
    const { pending } = useFormStatus();
    return (
        <div className='flex self-end'>
            {!pending ? <Button type="submit">Salvar</Button> : <ButtonLoading />}
        </div>
    )
}

export default RegisterForm;
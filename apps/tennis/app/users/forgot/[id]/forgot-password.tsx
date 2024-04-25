"use client"

import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ButtonLoading } from '@/components/ui/button-loading';
import { Form } from "@/components/ui/form";
import useToastMessage from '@/components/hooks/useToastMessage';
import { changePassword } from '@/lib/actions';
import LoginForm from '../../login-form';

const formSchema = z.object({
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

function ForgotPassword({ data }: any) {
    const { successMessage, errorMessage } = useToastMessage();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: data?.email || "",
            password: "",
            confirm_password: ""
        },
    })

    async function formAction(formData: FormData) {
        const validFields = await form.trigger();

        if (validFields) {
            const response = await changePassword(formData);

            if (response?.error) {
                errorMessage(response)
                return;
            }

            form.reset();

            successMessage({
                title: "Esqueci minha senha",
                description: "Senha alterada com sucesso."
            })

            redirect('/')
        }
    }

    const handleBlur = (form: any) => {
        form.trigger();
    }

    return (
        <div className='w-[400px] md:w-[700px]'>
            <Form {...form}>
                <form action={async (formData) => await formAction(formData)} className="flex flex-col items-center space-y-8 justify-center w-full">
                    <div className='flex flex-col md:flex-row gap-8'>
                        <LoginForm form={form} disableEmailField={data ? true : false} handleBlur={handleBlur}/>
                    </div>

                    <SaveButton />
                </form>
            </Form>
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

export default ForgotPassword;
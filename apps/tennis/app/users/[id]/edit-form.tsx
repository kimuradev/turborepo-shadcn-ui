"use client"

import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ButtonLoading } from '@/components/ui/button-loading';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import useToastMessage from '@/components/hooks/useToastMessage';
import { changePassword, updateUserPassword } from '@/lib/actions';

import LoginForm from '../login-form';
import PersonalForm from '../personal-form';
import { Input } from '@/components/ui/input';
import { useAuthContext } from '@/app/context/auth-context';


const formUserSchema = z.object({
    cpf: z.string().min(1, { message: "Campo obrigatório" }),
    name: z.string().min(1, { message: "Campo obrigatório" }),
    phone: z.string().min(13, { message: "Campo obrigatório" }).max(14, { message: "Telefone inválido" }),
    current_password: z.string().min(1, { message: "Campo obrigatório" }),
})

const formChangePasswordSchema = z.object({
    cpf: z.string().min(1, { message: "Campo obrigatório" }),
    email: z.string().min(1, { message: "Campo obrigatório" }),
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

function EditUserForm({ data, userId }: any) {
    const { successMessage, errorMessage } = useToastMessage();
    const { setProfile } = useAuthContext()

    const formUser = useForm<z.infer<typeof formUserSchema>>({
        resolver: zodResolver(formUserSchema),
        defaultValues: {
            cpf: data?.cpf || "",
            name: data?.name || "",
            phone: data?.phone || "",
            current_password: ""
        },
    })

    const formChangePassword = useForm<z.infer<typeof formChangePasswordSchema>>({
        resolver: zodResolver(formChangePasswordSchema),
        defaultValues: {
            cpf: data?.cpf || "",
            email: data?.email || "",
            password: "",
            confirm_password: ""
        },
    })

    async function formUserAction() {
        const validFields = await formUser.trigger();

        if (validFields) {
            const response = await updateUserPassword({ user_id: userId, ...formUser.getValues() });

            setProfile((state) => ({
                ...state,
                ...response.data
            }))

            if (response?.error) {
                errorMessage(response)
                return;
            }

            formUser.reset();

            successMessage({
                title: "Dados cadastrais",
                description: "Dados alterados com sucesso."
            })

            redirect(`/`)
        }
    }


    async function formChangePasswordAction(formData: FormData) {
        const validFields = await formChangePassword.trigger();

        if (validFields) {
            const response = await changePassword(formData);

            if (response?.error) {
                errorMessage(response)
                return;
            }

            formChangePassword.reset();

            successMessage({
                title: "Alteração de senha.",
                description: "Senha atualizada com sucesso."
            })

            redirect('/')
        }
    }

    const handleBlur = (form: any) => {
        form.trigger();
    }

    return (
        <div className='w-full md:w-[700px] flex flex-col md:flex-row gap-4'>
            {data?.player_id && (
                <div className='border rounded-md border-slate-300 w-full p-4 overflow-hidden'>
                    <Form {...formUser}>
                        <form action={async () => await formUserAction()} className="flex flex-col justify-between h-full w-full">
                            <PersonalForm form={formUser} handleBlur={handleBlur} disableCpfField={data ? true : false} />
                            <FormField
                                control={formUser.control}
                                name="current_password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha atual</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Confirmar Senha" type="password" {...field} onBlur={() => handleBlur(formUser)} />
                                        </FormControl>
                                        <FormDescription>
                                            Digite sua senha atual.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <SaveButton />
                        </form>
                    </Form>
                </div>
            )}

            <div className='border rounded-md border-slate-300 w-full p-4 overflow-hidden'>
                <Form {...formChangePassword}>
                    <form action={async (formData) => await formChangePasswordAction(formData)} className="flex flex-col space-y-8 justify-center h-full w-full">
                        <div className='flex flex-col md:flex-row gap-8'>
                            <LoginForm form={formChangePassword} disableEmailField={data ? true : false} handleBlur={handleBlur} />
                        </div>

                        <ChangePasswordButton />
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

function ChangePasswordButton() {
    const { pending } = useFormStatus();
    return (
        <div className='flex self-end'>
            {!pending ? <Button type="submit">Alterar senha</Button> : <ButtonLoading />}
        </div>
    )
}

export default EditUserForm;
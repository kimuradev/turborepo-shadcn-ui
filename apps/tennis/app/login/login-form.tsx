"use client"

import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { ButtonLoading } from '@repo/ui/components/ui/button-loading';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@repo/ui/components/ui/form";
import useToastMessage from '@/components/hooks/useToastMessage';
import { authenticate } from '@/lib/actions';
import { useAuthContext } from '../context/auth-context';

const formSchema = z.object({
    email: z.string().nonempty('Campo obrigatório'),
    password: z.string().nonempty('Campo obrigatório')
})

function LoginForm({ handleCancel }: { handleCancel: () => void }) {
    const { successMessage, errorMessage } = useToastMessage();
    const { login, setProfile } = useAuthContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function formAction(formData: FormData) {
        const validFields = await form.trigger();

        if (validFields) {
            const response = await authenticate(formData);
            if (response?.error) {
                errorMessage(response)
                return;
            }
            
            setProfile(response)

            successMessage({
                title: "Login",
                description: "Usuário logado com sucesso."
            })

            login(response);
        }
    }

    return (
        <>
            <div className='flex flex-col space-y-1.5 text-center sm:text-left'>
                <h2 className='text-lg font-semibold leading-none tracking-tight'>
                    Login
                </h2>
                <p className='text-sm text-muted-foreground'>Digite seu usuário e senha para fazer login.</p>
            </div>

            <Form {...form}>
                <form action={async (formData) => await formAction(formData)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Usuário" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Senha" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-between'>
                        <Link href='/users/forgot'>
                            <span className='p-0 text-sm text-orange-400' onClick={handleCancel}>Esqueci minha senha</span>
                        </Link>

                        <LoginButton />
                    </div>
                </form>
            </Form>
            <div>
                <span className='text-sm text-muted-foreground'>Ainda não tem cadastro? </span>
                <Link href='/users/register'>
                    <span className='p-0 text-sm text-orange-400 font-semibold' onClick={handleCancel}>Registrar</span>
                </Link>
            </div>
        </>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()
    return (
        <div className='flex justify-end'>
            {!pending ? <Button type="submit">Entrar</Button> : <ButtonLoading />}
        </div>
    )
}

export default LoginForm;
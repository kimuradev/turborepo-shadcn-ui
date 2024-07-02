"use client"

import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@repo/ui/components/ui/button";
import { ButtonLoading } from '@repo/ui/components/ui/button-loading';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import useToastMessage from '@repo/ui/components/hooks/useToastMessage';
import { registerUserAABB } from '@/lib/actions';

import { Separator } from '@ui/components/ui/separator';
import { Input } from '@ui/components/ui/input';
import { formatCpf } from '@/lib/utils';
import { PhoneInput } from '@ui/components/ui/phone-input';

const formSchema = z.object({
    name: z.string().min(1, { message: "Campo obrigatório" }),
    cpf: z.string().min(1, { message: "Campo obrigatório" }),
    phone: z.string().optional(),
    email: z.string().optional(),
    // password: z.string().min(1, { message: "Campo obrigatório" }),
    // confirm_password: z.string().min(1, { message: "Campo obrigatório" })
})
// .superRefine((arg, ctx) => {
//     if (arg.confirm_password !== arg.password) {
//         ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: "Senha não confere",
//             path: ["confirm_password"]
//         });
//     }

//     return z.NEVER;
// })

function RegisterForm() {
    const { successMessage, errorMessage } = useToastMessage();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cpf: "",
            phone: "",
            email: "",
            // password: "",
            // confirm_password: ""
        },
    })

    async function formAction(formData: FormData) {
        const validFields = await form.trigger();

        if (validFields) {

            // const values = form.getValues();
            // console.log('values: ', values)

            const response = await registerUserAABB({...form.getValues()});

            if (response?.error) {
                errorMessage(response)
                return;
            }

            successMessage({
                title: "Registro de usuário",
                description: "Usuário cadastrado com sucesso."
            })

            form.reset();
            // redirect('/')
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
                            {/* <LoginForm form={form} handleBlur={handleBlur} showCpf={true} /> */}

                            <section className="flex flex-col gap-6 w-full">
                                <div>
                                    <h1> Dados de login </h1>
                                    <Separator className='mt-2' />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Digite seu nome..." {...field}
                                                    onBlur={() => handleBlur(form)}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Digite seu CPF
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cpf"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>CPF</FormLabel>
                                            <FormControl>
                                                <Input placeholder="999.999.999-99" {...field}
                                                    onChange={(event) =>
                                                        field.onChange(formatCpf(event.target.value))
                                                    }
                                                    onBlur={() => handleBlur(form)}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Digite seu CPF
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col items-start">
                                            <FormLabel className="text-left">Telefone</FormLabel>
                                            <FormControl className="w-full">
                                                <PhoneInput defaultCountry='BR' {...field} onBlur={() => handleBlur(form)} />
                                            </FormControl>
                                            <FormDescription className="text-left">
                                                Digite um telefone para contato.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

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
                                                Digite um e-mail válido. Esse será seu e-mail para login.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Senha</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Senha" type="password" {...field} onBlur={() => handleBlur(form)} />
                                            </FormControl>
                                            <FormDescription>
                                                Digite sua senha.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirmar Senha</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Confirmar Senha" type="password" {...field} onBlur={() => handleBlur(form)} />
                                            </FormControl>
                                            <FormDescription>
                                                Confirme sua senha.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                /> */}
                            </section>

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
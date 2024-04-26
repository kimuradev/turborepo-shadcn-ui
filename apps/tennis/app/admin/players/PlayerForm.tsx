"use client"

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useFormStatus } from 'react-dom';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@repo/ui/components/ui/phone-input";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { ButtonLoading } from '@repo/ui/components/ui/button-loading';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/ui/select"
import useToastMessage from '@tennis/components/hooks/useToastMessage';

import { STATUS_OPTIONS } from '@tennis/lib/constants';
import { type PlayersProps } from '@tennis/lib/definitions';
import { addPlayer, editPlayer } from '@tennis/lib/actions';

const formSchema = z.object({
    name: z.string().nonempty('Campo obrigatório'),
    status: z.string().nonempty('Campo obrigatório'),
    phone: z.string().optional(),
    email: z.string().email("E-mail inválido.").optional().or(z.literal('')),
})

function PlayerForm({ player }: { player?: PlayersProps }) {
    const { successMessage, errorMessage } = useToastMessage();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            status: '',
            phone: player?.phone || '',
            email: player?.email || '',
        },
    })

    useEffect(() => {
        if (!player?.name && !player?.status) return;

        setTimeout(() => {
            form.setValue('name', player?.name)
            form.setValue('status', player?.status)
        })
    }, [player?.name, player?.status])

    async function formAction() {
        const validFields = await form.trigger();

        if (validFields) {
            const { id }: any = player;
            const action = id ? editPlayer({ id, ...form.getValues() }) : addPlayer(form.getValues())
            const response = await action;

            if (response?.error) {
                errorMessage(response);
                return;
            }

            form.reset();

            successMessage({
                title: `${id ? 'Edição' : 'Cadastro'} de jogador.`,
                description: `Jogador ${id ? 'atualizado' : 'cadastrado'} com sucesso!`,
            })
        }
    }

    return (
        <Form {...form}>
            <form action={async () => await formAction()} className="space-y-8" >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome..." {...field} />
                            </FormControl>
                            <FormDescription>
                                Digite nome e sobrenome do jogador.
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
                                <PhoneInput defaultCountry='BR' {...field} />
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
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="email@email.com" {...field} disabled={true}/>
                            </FormControl>
                            <FormDescription>
                                Digite um e-mail para contato.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value} >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecione o status do jogador" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {STATUS_OPTIONS.map(status => (
                                        <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Selecione o status atual do jogador.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <SaveButton />
            </form>
        </Form>
    )
}

function SaveButton() {
    const { pending } = useFormStatus();
    return (
        <div className='flex justify-end'>
            {!pending ? <Button type="submit">Salvar</Button> : <ButtonLoading />}
        </div>
    )
}

export default PlayerForm;
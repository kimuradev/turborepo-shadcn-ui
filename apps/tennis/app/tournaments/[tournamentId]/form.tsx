import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { GAME_RESULTS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ButtonLoading } from '@/components/ui/button-loading';
import useToastMessage from '@/components/hooks/useToastMessage';
import { useAppContext } from '@/app/context/app-context';
import { type TournamentResultProps } from '@/lib/definitions';
import { putApiWithCredentials } from '@/lib/fetchWithCredentials';

const formSchema = z.object({
    player1_score: z.string().nonempty('Campo obrigatório'),
    player2_score: z.string().nonempty('Campo obrigatório'),
}).superRefine((arg, ctx) => {
    if (arg.player1_score === arg.player2_score) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Placar não pode ser igual.",
            path: ["player2_score"]
        });
    }

    const scoreSum = parseInt(arg.player1_score || '0', 10) + parseInt(arg.player2_score || '0', 10);

    if (scoreSum < 2) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Resultado não pode ter menos de 2 sets.",
            path: ["player2_score"]
        });
    }

    return z.NEVER;
})

export default function TournamentResultForm({ data, handleCloseDialog }: TournamentResultProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { successMessage , errorMessage } = useToastMessage();
    const { updateGameResult, isFinals } = useAppContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            player1_score: '',
            player2_score: '',
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        try {
            const response = await putApiWithCredentials(`${isFinals ? '/games/finals': '/games'}`, {
                id: data.id,
                unique_id: data.unique_id,
                player1_id: data.player1_id,
                player2_id: data.player2_id, 
                game_number: data.game_number,
                round: data.round,
                classId: data.class_id,
                player1_score: values.player1_score,
                player2_score: values.player2_score,
            })

            form.reset();

            successMessage({
                title: "Resultado",
                description: "Resultado salvo com sucesso!"
            })

            updateGameResult(response)
            handleCloseDialog();
        } catch (err) {
            errorMessage();
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex justify-between'>
                    <FormField
                        control={form.control}
                        name="player1_score"
                        render={({ field }) => (
                            <FormItem className='w-[150px]'>
                                <FormLabel className='text-xs truncate block'>{data.player1 || 'Bye'}</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Placar..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {GAME_RESULTS.map((result: string) => (
                                                <SelectItem key={result} value={result}>{result}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='flex justify-center items-center'>
                        <span>X</span>
                    </div>
                    <FormField
                        control={form.control}
                        name="player2_score"
                        render={({ field }) => (
                            <FormItem className='w-[150px]'>
                                <FormLabel className='text-xs truncate block'>{data.player2}</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Placar..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {GAME_RESULTS.map((result: string) => (
                                            <SelectItem key={result} value={result}>{result}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="text-sm text-muted-foreground mb-6 mt-6">
                    <p>Você tem certeza que deseja <strong>salvar</strong> esse resultado?</p>
                    <p>Esse resultado <strong>não poderá ser alterado</strong> no futuro.</p>
                </div>

                <div className='flex justify-end gap-4'>
                    <Button onClick={handleCloseDialog} variant="ghost">Cancelar</Button>
                    {!isLoading ? <Button type="submit">{(data.player1_score === null && data.player2_score === null) ? 'Salvar' : 'Editar'}</Button> : <ButtonLoading />}
                </div>
            </form>
        </Form>
    )
}
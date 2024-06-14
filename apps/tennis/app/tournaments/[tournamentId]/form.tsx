import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/ui/select"
import { FINALS_TYPE, GAME_RESULTS, PLAYOFF_ELIMINATION_TYPE } from '@/lib/constants';
import { Button } from '@repo/ui/components/ui/button';
import { ButtonLoading } from '@repo/ui/components/ui/button-loading';
import useToastMessage from '@repo/ui/components/hooks/useToastMessage';
import { useAppContext } from '@/app/context/app-context';
import { type TournamentResultProps } from '@/lib/definitions';
import { putApiWithCredentials } from '@/lib/fetchWithCredentials';
import { getNameWithAbbreviation } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';
import { useAuthContext } from '@/app/context/auth-context';
import { useTournamentDetails } from './useTournamentDetails';

const WO_WIN_SCORE = "2";
const WO_LOSE_SCORE = "0";

export default function TournamentResultForm({ data, tournament, year, handleCloseDialog }: TournamentResultProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { successMessage, errorMessage } = useToastMessage();
    const { updateGameResult, isFinals } = useAppContext();
    const { isAdmin } = useAuthContext();
    const [isWOChecked, setIsWOChecked] = useState(false);
    const [isSorted, setIsSorted] = useState(false);
    // @ts-ignore
    const [{ tournamentType },] = useTournamentDetails({ year, tournament });

    const formSchema = z.object({
        wo: z.boolean().default(false).optional(),
        wo_player: isWOChecked ? z.string().min(1, { message: "Campo obrigatório" }) : z.string().optional(),
        player1_score: isWOChecked || isSorted ? z.string().optional() : z.string().min(1, { message: "Campo obrigatório" }),
        player2_score: isWOChecked || isSorted ? z.string().optional() : z.string().min(1, { message: "Campo obrigatório" }),
    }).superRefine((arg, ctx) => {
        if (isWOChecked || isSorted) return z.NEVER;

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

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            player1_score: '',
            player2_score: '',
            wo_player: '',
            wo: false
        }
    })

    const woPlayer = form.watch('wo_player');

    const WO_PLAYERS = [
        { id: 1, key: data.player1_id, value: getNameWithAbbreviation(data.player1) },
        { id: 2, key: data.player2_id, value: getNameWithAbbreviation(data.player2) }
    ]

    const getWoPlayerScore = (woPlayer: string) => WO_PLAYERS.find(player => player.key === woPlayer);

    const randomWinnerChoice = () => {
        const randomNumber = Math.random();
        // If the random number is less than 0.5, return 1, otherwise return 2
        const winner = randomNumber < 0.5 ? 1 : 2;

        return {
            player1_score: winner === 1 ? WO_WIN_SCORE : WO_LOSE_SCORE,
            player2_score: winner === 2 ? WO_WIN_SCORE : WO_LOSE_SCORE,
            game_flow: 'sorted'
        }
    }

    const getUrl = () => {
        switch (tournamentType) {
            case PLAYOFF_ELIMINATION_TYPE:
              return '/games/playoffs'
            case FINALS_TYPE:
              return '/games/finals'
            default:
              return '/games'
          }
    }

    const handlePayload = async (values: any) => {
        let response;
        const payload = {
            id: data.id,
            unique_id: data.unique_id,
            player1_id: data.player1_id,
            player2_id: data.player2_id,
            game_number: data.game_number,
            round: data.round,
            classId: data.class_id,
        }
        const url = getUrl();
        const player: any = getWoPlayerScore(woPlayer || '')

        if (isSorted) {
            response = await putApiWithCredentials(`${url}`, {
                ...payload,
                ...randomWinnerChoice()
            })
        } else if (isWOChecked) {
            response = await putApiWithCredentials(`${url}`, {
                ...payload,
                player1_score: player.id === 1 ? WO_WIN_SCORE : WO_LOSE_SCORE,
                player2_score: player.id === 2 ? WO_WIN_SCORE : WO_LOSE_SCORE,
                game_flow: 'wo'
            })
        } else {
            response = await putApiWithCredentials(`${url}`, {
                ...payload,
                player1_score: values.player1_score,
                player2_score: values.player2_score,
                game_flow: 'normal'
            })
        }

        return response;
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);

        try {
            const response = await handlePayload(values)

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
                                    <Select onValueChange={field.onChange} value={field.value} disabled={isWOChecked}>
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
                                <Select onValueChange={field.onChange} value={field.value} disabled={isWOChecked}>
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

                <div className='flex gap-4 justify-around items-center rounded-md border p-2 mb-4'>
                    <FormField
                        control={form.control}
                        name="wo"
                        render={({ field }) => (
                            <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md'>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(value: boolean) => {
                                            field.onChange(value)
                                            setIsWOChecked(value)
                                            setIsSorted(false)
                                        }}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        W.O
                                    </FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="wo_player"
                        render={({ field }) => (
                            <FormItem className='w-[250px]'>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value} disabled={!isWOChecked}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Vencedor..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {WO_PLAYERS.map((result: any) => (
                                                <SelectItem key={result.key} value={result.key.toString()}>{result.value}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className={`flex gap-4 pt-4 ${isAdmin ? 'justify-between' : 'justify-end'}`}>
                    <div>
                        {isAdmin && (
                            <Button variant="link" type="submit" className='flex items-center justify-center gap-2 p-0' disabled={isWOChecked || isLoading}>
                                <RefreshCw className='w-4 h-4' />
                                <span className='p-0 text-sm text-primary' onClick={() => { setIsSorted(true); setIsWOChecked(false) }}>Sortear vencedor</span>
                            </Button>
                        )}
                    </div>
                    <div className='flex items-center justify-center'>
                        <Button onClick={handleCloseDialog} variant="ghost">Cancelar</Button>
                        {!isLoading ? <Button type="submit">{(data.player1_score === null && data.player2_score === null) ? 'Salvar' : 'Editar'}</Button> : <ButtonLoading />}
                    </div>
                </div>
            </form>
        </Form>
    )
}
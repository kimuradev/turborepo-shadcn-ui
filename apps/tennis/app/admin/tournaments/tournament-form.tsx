"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import isEmpty from 'lodash/isEmpty';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@repo/ui/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group"

import { MultiSelect } from "@repo/ui/components/ui/multi-select";
import { Button } from "@repo/ui/components/ui/button";
import { useEffect, useState } from "react";
import { ButtonLoading } from "@repo/ui/components/ui/button-loading";
import { useAppContext } from "@tennis/app/context/app-context";
import { FINALS_CLASS_ID, TOURNAMENT_DICTIONARY, TOURNAMENT_ID, YEARS } from "@tennis/lib/constants";
import { addTournament } from "@tennis/lib/actions";
import useToastMessage from "@tennis/components/hooks/useToastMessage";
import { getApi } from "@tennis/lib/fetch";
import Spinner from "@repo/ui/components/ui/spinner";
import SubscribedPlayers from "./subscribed-players";
import { SubscribedPlayersProps } from "@tennis/lib/definitions";

export default function TournamentForm() {
    const [players, setPlayers] = useState({
        isFiltered: false,
        isLoading: false,
        defaultValues: [],
        options: []
    })

    const [subscribedPlayers, setSubscribedPlayers] = useState<SubscribedPlayersProps>({
        data: [],
        isLoading: false
    })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const { successMessage, errorMessage } = useToastMessage();
    const { classes, setClasses, isFinals, setIsFinals } = useAppContext();

    const minPlayersMessage = `Mínimo de ${isFinals ? 8 : 2} jogadores`
    const maxPlayersMessage = `Máximo de ${isFinals ? 8 : 16} jogadores`

    const formSchema = z.object({
        tournament: z.string().nonempty('Campo obrigatório'),
        year: z.string().nonempty('Campo obrigatório'),
        seed: isFinals ? z.string() : z.enum(["true", "false"], {
            errorMap: (issue, ctx) => ({ message: 'Campo obrigatório' })
        }),
        classId: isFinals ? z.string() : z.string().nonempty('Campo obrigatório'),
        players: z.array(
            z.record(
                z.string().trim()
            )
        ).nonempty('Campo obrigatório').min(isFinals ? 8 : 2, {
            message: minPlayersMessage,
        }).max(isFinals ? 8 : 16, {
            message: maxPlayersMessage,
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tournament: '',
            year: '',
            classId: '',
            players: [],
            seed: ''
        },
    });

    

    const tournamentWatch = form.watch('tournament')
    const yearWatch = form.watch('year')
    const classWatch = form.watch('classId')

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const playersResponse = await getApi('/players', { cache: 'no-store' });

                const options = playersResponse.map((player: any) => ({
                    value: player.id,
                    label: player.name
                }))

                setPlayers((state) => ({
                    ...state,
                    options: options
                }))

                if (!classes.length) {
                    const classesResponse = await getApi('/classes', { cache: 'no-store' });
                    setClasses(classesResponse)
                }

            } catch (err) {
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [])

    const fetchPlayersByRanking = async () => {
        setPlayers((state) => ({
            ...state,
            isLoading: true
        }))

        try {
            const response = await getApi(`/players/ranking?tournamentId=${tournamentWatch}&year=${yearWatch}&classId=${classWatch}`);

            form.setValue('players', response as any)

            setPlayers((state) => ({
                ...state,
                isFiltered: true
            }))
        } catch (err) {
        } finally {
            setPlayers((state) => ({
                ...state,
                isLoading: false
            }))
        }
    }

    const fetchPlayersByTournament = async () => {
        setSubscribedPlayers((state) => ({
            ...state,
            isLoading: true
        }))

        try {
            const response = await getApi(`/players/subscribed-tournament?tournamentId=${tournamentWatch}&year=${yearWatch}`);

            setSubscribedPlayers((state) => ({
                ...state,
                data: response,
            }))
        } catch (err) {
        } finally {
            setSubscribedPlayers((state) => ({
                ...state,
                isLoading: false
            }))
        }
    }

    useEffect(() => {
        if (tournamentWatch && yearWatch) {
            fetchPlayersByTournament()
        }

    }, [tournamentWatch, yearWatch])

    useEffect(() => {
        if (tournamentWatch && yearWatch && classWatch) {
            fetchPlayersByRanking()
        }

    }, [tournamentWatch, yearWatch, classWatch])


    async function formAction() {
        const validFields = await form.trigger();
        let response: any;

        const tournament = form.getValues("tournament").toString()
        const year = form.getValues("year").toString()
        const classId = form.getValues("classId").toString()

        if (validFields) {
            if (isFinals) {
                const values = { ...form.getValues(), classId: FINALS_CLASS_ID }
                response = await addTournament('/games/finals-generator', values)
            } else {
                response = await addTournament('/games/generator', form.getValues())
            }

            if (response?.error) {
                errorMessage(response);
                return;
            }

            form.reset();

            successMessage({ title: "Cadastro de torneio.", description: "Sorteio dos jogos realizado com sucesso!", })

            if (isFinals) {
                router.push(`/tournaments/${tournament}?year=${year}`)
            }
            else {
                router.push(`/tournaments/${tournament}?year=${year}&classId=${classId}`)
            }
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="w-full md:w-[600px]">
            <Form {...form}>
                <form
                    action={async () => await formAction()}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="tournament"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Selecione o torneio: </FormLabel>
                                <FormControl>
                                    <Select onValueChange={(value) => {
                                        setIsFinals(value === TOURNAMENT_ID.FINALS)
                                        return field.onChange(value)
                                    }}
                                        value={field.value} >
                                        <FormControl>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Torneios..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {TOURNAMENT_DICTIONARY.map((c: any) => (
                                                <SelectItem key={c.id} value={c.id}>{c.value}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Selecione o ano: </FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Ano..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {YEARS.map((year: any) => (
                                                <SelectItem key={year} value={year}>{year}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {!isFinals && (
                        <>
                            <FormField
                                control={form.control}
                                name="classId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Selecione a classe: </FormLabel>
                                        <FormControl>
                                            <Select onValueChange={field.onChange} value={field.value} disabled={isEmpty(tournamentWatch) || isEmpty(yearWatch)}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Classe..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {classes.map((c: any) => (
                                                        <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <SubscribedPlayers players={subscribedPlayers} tournament={tournamentWatch} year={yearWatch}/>

                            <FormField
                                control={form.control}
                                name="seed"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Com cabeça de chave?</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0 ">
                                                    <FormControl>
                                                        <RadioGroupItem value="true" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal cursor-pointer">
                                                        Sim
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0 ">
                                                    <FormControl>
                                                        <RadioGroupItem value="false" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal cursor-pointer">
                                                        Não
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    <FormField
                        control={form.control}
                        name="players"
                        render={({ field: { ...field } }) => (
                            <FormItem className="mb-5">
                                <div className="flex justify-between">
                                    <FormLabel>Selecione os participantes do torneio</FormLabel>
                                    <FormDescription>
                                        Selecionados: {form.getValues('players').length}
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    {players.isLoading ? (<Spinner />) : (
                                        <MultiSelect
                                            defaultValues={players.defaultValues}
                                            selectedValue={field.value}
                                            options={players.options}
                                            placeholder="Participantes..."
                                            {...field}
                                            disabled={!players.isFiltered} />
                                    )}

                                </FormControl>
                                <FormDescription>
                                    {minPlayersMessage} e {maxPlayersMessage}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <ShuffleButton />
                </form>
            </Form>
        </div>
    )
}

function ShuffleButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {!pending ? (
                <Button type="submit" className="w-full">
                    Sortear chave
                </Button>) : <ButtonLoading className="w-full" />}
        </>
    )
}
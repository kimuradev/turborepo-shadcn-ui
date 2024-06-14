"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useFormStatus } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@ui/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@ui/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@ui/components/ui/radio-group"

import { MultiSelect } from "@ui/components/ui/multi-select";
import { Button } from "@ui/components/ui/button";
import { useEffect, useState } from "react";
import { ButtonLoading } from "@ui/components/ui/button-loading";
import { useAppContext } from "@/app/context/app-context";
import {
    FINALS_CLASS_ID, FINALS_TYPE, PLAYOFFS_CLASS_ID, PLAYOFF_CLASSIFICATION_TYPE,
    PLAYOFF_ELIMINATION_TYPE, TOURNAMENT_DICTIONARY, TOURNAMENT_ID, TOURNAMENT_TYPE, YEARS
} from "@/lib/constants";
import { addTournament } from "@/lib/actions";
import useToastMessage from "@ui/components/hooks/useToastMessage";
import { getApi } from "@/lib/fetch";
import Spinner from "@ui/components/ui/spinner";
import SubscribedPlayers from "./subscribed-players";
import { SubscribedPlayersProps } from "@/lib/definitions";
import { Separator } from "@ui/components/ui/separator";

const MIN_PLAYER_QTY = 4;
const FINALS_PLAYER_QTY = 8;
const MAX_PLAYOFF_CLASSIFICATION_PLAYER_QTY = 16;

const getMaxPlayerQty = (tournamentType: string, playerQty: number): number => {
    if (tournamentType === PLAYOFF_ELIMINATION_TYPE) {
        return isNaN(playerQty) ? 16 : playerQty
    }
    return tournamentType === FINALS_TYPE ? FINALS_PLAYER_QTY : MAX_PLAYOFF_CLASSIFICATION_PLAYER_QTY
}

const getMinPlayerQty = (tournamentType: string, playerQty: number) => {
    if (isNaN(playerQty)) return MIN_PLAYER_QTY;

    if (tournamentType === FINALS_TYPE) {
        return FINALS_PLAYER_QTY
    }
    return playerQty / MIN_PLAYER_QTY;
}

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
    const router = useRouter();
    const { successMessage, errorMessage } = useToastMessage();
    const { classes, setClasses, isFinals, setIsFinals } = useAppContext();

    const [isLoading, setIsLoading] = useState(false)
    const [tournamentType, setTournamentType] = useState(PLAYOFF_CLASSIFICATION_TYPE)
    const [playerQty, setPlayerQty] = useState(MAX_PLAYOFF_CLASSIFICATION_PLAYER_QTY)
    const [tournamentOptions, setTournamentOptions] = useState(TOURNAMENT_DICTIONARY)
    const maxPlayerQtyValidation = getMaxPlayerQty(tournamentType, playerQty)
    const minPlayerQtyValidation = getMinPlayerQty(tournamentType, playerQty)

    const minPlayersMessage = `Mínimo de ${getMinPlayerQty(tournamentType, playerQty)} jogadores`
    const maxPlayersMessage = `Máximo de ${maxPlayerQtyValidation} jogadores`

    const formSchema = z.object({
        tournament: z.string().nonempty('Campo obrigatório'),
        year: z.string().nonempty('Campo obrigatório'),
        seed: isFinals ? z.string() : z.enum(["true", "false"], {
            errorMap: (issue, ctx) => ({ message: 'Campo obrigatório' })
        }),
        playerQty: tournamentType === PLAYOFF_ELIMINATION_TYPE ? z.string().nonempty('Campo obrigatório') : z.string(),
        classId: tournamentType === PLAYOFF_ELIMINATION_TYPE || isFinals ? z.string() : z.string().nonempty('Campo obrigatório'),
        type: z.string(),
        players: z.array(
            z.record(
                z.string().trim()
            )
        ).nonempty('Campo obrigatório').min(minPlayerQtyValidation, {
            message: minPlayersMessage,
        }).max(maxPlayerQtyValidation, {
            message: maxPlayersMessage,
        })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tournament: '',
            year: '',
            classId: '',
            playerQty: '',
            type: '',
            players: [],
            seed: ''
        },
    });

    const tournamentWatch = form.watch('tournament')
    const yearWatch = form.watch('year')
    const classWatch = form.watch('classId')
    const typeWatch = form.watch('type')
    const playerQtyWatch = form.watch('playerQty')

    useEffect(() => {
        setTournamentType(typeWatch)

        if (typeWatch === PLAYOFF_ELIMINATION_TYPE) {
            setTournamentOptions(TOURNAMENT_DICTIONARY.filter(tournament => tournament.id === TOURNAMENT_ID.AB || tournament.id === TOURNAMENT_ID.DOUBLES));
        } else if (typeWatch === TOURNAMENT_ID.FINALS) {
            setTournamentOptions(TOURNAMENT_DICTIONARY.filter(tournament => tournament.id === TOURNAMENT_ID.FINALS));
        } else {
            setTournamentOptions(TOURNAMENT_DICTIONARY.filter(tournament => tournament.id !== TOURNAMENT_ID.FINALS))
        }
    }, [typeWatch])

    useEffect(() => {
        setPlayerQty(parseInt(playerQtyWatch, 10))
    }, [playerQtyWatch])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
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

    const fetchSubscribedPlayers = async () => {
        setPlayers((state) => ({
            ...state,
            isLoading: true
        }))
        try {
            const response = await getApi(`/players/subscribed-tournament?tournamentId=${tournamentWatch}&year=${yearWatch}`);

            const options = response.map((player: any) => ({
                value: player.player_id,
                label: player.player_name
            }))

            setPlayers((state) => ({
                ...state,
                options: sortBy(options, ['label']) as any,
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

    const fetchSubscribedPlayersByClassOrderedByRanking = async () => {
        setPlayers((state) => ({
            ...state,
            isLoading: true
        }))

        try {
            const responseByClass = await getApi(`/players/ranking?tournamentId=${tournamentWatch}&year=${yearWatch}&classId=${classWatch}`);

            form.setValue('players', responseByClass as any)

            const response = await getApi(`/players/subscribed-tournament?tournamentId=${tournamentWatch}&year=${yearWatch}`);

            const options = response.map((player: any) => ({
                value: player.player_id,
                label: player.player_name
            }))

            setPlayers((state) => ({
                ...state,
                options: sortBy(options, ['label']) as any,
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

    const fetchSubscribedPaymentStatusPlayers = async () => {
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

    const fetchPlayersByRanking = async () => {
        setPlayers((state) => ({
            ...state,
            isLoading: true
        }))
        try {
            const response = await getApi(`/ranking-leader?limit=16`);

            const options = response.map((player: any) => ({
                value: player.player_id,
                label: player.player_name
            }))

            setPlayers((state) => ({
                ...state,
                options: options,
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

    useEffect(() => {
        if (tournamentWatch && yearWatch) {
            if (typeWatch === PLAYOFF_CLASSIFICATION_TYPE && classWatch) {
                fetchSubscribedPlayersByClassOrderedByRanking()
            } else if (typeWatch === PLAYOFF_CLASSIFICATION_TYPE) {
                fetchSubscribedPaymentStatusPlayers()
            } else if (typeWatch === PLAYOFF_ELIMINATION_TYPE) {
                fetchSubscribedPlayers()
            } else if (typeWatch === FINALS_TYPE) {
                fetchPlayersByRanking()
            }
        }

    }, [typeWatch, tournamentWatch, yearWatch, classWatch])

    const handleBlur = (form: any) => {
        form.trigger();
    }

    const handleRemoveAllPlayers = () => {
        form.setValue('players', [] as any)

        setPlayers((state) => ({
            ...state,
            isLoading: true,
        }))

        setTimeout(() => {
            setPlayers((state) => ({
                ...state,
                isLoading: false,
            }))
            // handleBlur(form);
        }, 100)
    }

    const handleSelectAllPlayers = () => {
        form.setValue('players', players.options as any)

        setPlayers((state) => ({
            ...state,
            isLoading: true,
        }))

        setTimeout(() => {
            setPlayers((state) => ({
                ...state,
                isLoading: false,
            }))
            handleBlur(form);
        }, 100)
    }

    async function formAction() {
        const validFields = await form.trigger();
        let response: any;

        const tournament = form.getValues("tournament").toString()
        const year = form.getValues("year").toString()
        const classId = form.getValues("classId").toString()

        if (validFields) {
            if (typeWatch === PLAYOFF_ELIMINATION_TYPE) {
                const values = { ...form.getValues(), classId: PLAYOFFS_CLASS_ID }
                response = await addTournament('/games/playoffs-generator', values)
            } else if (typeWatch === FINALS_TYPE) {
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

            if (typeWatch === PLAYOFF_ELIMINATION_TYPE || isFinals) {
                router.push(`/tournaments/${tournament}?year=${year}`)
            }
            else {
                router.push(`/tournaments/${tournament}?year=${year}&classId=${classId}`)
            }
        }
    }

    const resetForm = () => {
        if (tournamentWatch && tournamentWatch && yearWatch) {
            handleRemoveAllPlayers();
            form.reset()
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
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Selecione o tipo de torneio: </FormLabel>
                                <FormControl>
                                    <Select onValueChange={async (value) => {
                                        await resetForm();
                                        field.onChange(value);
                                    }} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Tipo de torneio..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {TOURNAMENT_TYPE.map((c: any) => (
                                                <SelectItem key={c.value} value={c.value.toString()}>{c.label}</SelectItem>
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
                        name="tournament"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Selecione o torneio: </FormLabel>
                                <FormControl>
                                    <Select onValueChange={(value) => {
                                        if (value === FINALS_TYPE) { setIsFinals(true) } else { setIsFinals(false) }
                                        return field.onChange(value)
                                    }}
                                        value={field.value}
                                        disabled={!typeWatch}>
                                        <FormControl>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Torneios..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {tournamentOptions.map((c: any) => (
                                                <SelectItem key={c.id} value={c.id} >{c.value}</SelectItem>
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
                                    <Select onValueChange={field.onChange} value={field.value} disabled={!typeWatch || !tournamentWatch}>
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

                    {typeWatch === PLAYOFF_ELIMINATION_TYPE && (
                        <FormField
                            control={form.control}
                            name="playerQty"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Quantidade de jogadores: </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                handleBlur(form)
                                            }}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0 ">
                                                <FormControl>
                                                    <RadioGroupItem value="16" disabled={!players.isFiltered} />
                                                </FormControl>
                                                <FormLabel className="font-normal cursor-pointer">
                                                    16
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0 ">
                                                <FormControl>
                                                    <RadioGroupItem value="32" disabled={!players.isFiltered || players.options.length <= 16} />
                                                </FormControl>
                                                <FormLabel className="font-normal cursor-pointer">
                                                    32
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0 ">
                                                <FormControl>
                                                    <RadioGroupItem value="64" disabled={!players.isFiltered || players.options.length <= 32} />
                                                </FormControl>
                                                <FormLabel className="font-normal cursor-pointer">
                                                    64
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0 ">
                                                <FormControl>
                                                    <RadioGroupItem value="128" disabled={!players.isFiltered || players.options.length <= 64} />
                                                </FormControl>
                                                <FormLabel className="font-normal cursor-pointer">
                                                    128
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    {typeWatch === PLAYOFF_CLASSIFICATION_TYPE && (
                        <>
                            <FormField
                                control={form.control}
                                name="classId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Selecione a classe: </FormLabel>
                                        <FormControl>
                                            <Select onValueChange={(event: any) => {
                                                field.onChange(event)
                                                handleBlur(form);
                                            }}
                                                value={field.value} disabled={isEmpty(tournamentWatch) || isEmpty(yearWatch)}>
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

                            <SubscribedPlayers players={subscribedPlayers} tournament={tournamentWatch} year={yearWatch} />
                        </>
                    )}

                    {!isFinals && (
                        <FormField
                            control={form.control}
                            name="seed"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Com cabeça de chave?</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                                handleBlur(form)
                                            }}
                                            className="flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-y-0 ">
                                                <FormControl>
                                                    <RadioGroupItem value="true" disabled={!players.isFiltered} />
                                                </FormControl>
                                                <FormLabel className="font-normal cursor-pointer">
                                                    Sim
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-y-0 ">
                                                <FormControl>
                                                    <RadioGroupItem value="false" disabled={!players.isFiltered} />
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
                    )}

                    <FormField
                        control={form.control}
                        name="players"
                        render={({ field: { ...field } }) => {
                            return (
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
                                                disabled={
                                                    (!players.isFiltered)
                                                } />
                                        )}

                                    </FormControl>
                                    <div className="flex justify-between">
                                        <FormDescription>
                                            {minPlayersMessage} e {maxPlayersMessage}
                                        </FormDescription>
                                        {typeWatch == PLAYOFF_ELIMINATION_TYPE && (
                                            <div className="flex gap-4">
                                                <FormDescription>
                                                    <Button type="button" variant="link" className="p-0 text-sm h-3" onClick={handleRemoveAllPlayers} disabled={field.value.length === 0}>Remover todos</Button>
                                                </FormDescription>
                                                <Separator orientation="vertical" />
                                                <FormDescription>
                                                    <Button type="button" variant="link" className="p-0 text-sm h-3" onClick={handleSelectAllPlayers} disabled={players.defaultValues.length === players.options.length}>Selecionar todos</Button>
                                                </FormDescription>
                                            </div>
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )
                        }}
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
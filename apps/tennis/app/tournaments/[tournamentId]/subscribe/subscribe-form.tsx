"use client"

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
import useToastMessage from '@repo/ui/components/hooks/useToastMessage';

import { SHIRT_SIZE, TOURNAMENT_ID } from '@/lib/constants';
import { Alert, AlertDescription, AlertTitle } from '@repo/ui/components/ui/alert';
import { Terminal } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/ui/radio-group';
import { useAuthContext } from '@/app/context/auth-context';
import { formatCpf } from '@/lib/utils';
import { tournamentSubscribe } from '@/lib/actions';

const formSchema = z.object({
    name: z.string().min(1, { message: 'Campo obrigatório' }),
    cpf: z.string().min(14, { message: 'Campo obrigatório' }),
    ab_id: z.string().min(1, { message: 'Campo obrigatório' }),
    phone: z.string().min(1, { message: 'Campo obrigatório' }),
    email: z.string().email("E-mail inválido.").or(z.literal('')),
    shirt: z.string().optional(),
    agree: z.enum(["true", "false"], {
        errorMap: () => ({ message: 'Campo obrigatório' })
    }).refine(value => value === "true", {
        message: "Você precisa concordar com os termos para prosseguir.",
    })
})
export default function SubscribeForm({ tournament, year }: { tournament: { id: string, value: string}, year: string }) {

    const { successMessage, errorMessage } = useToastMessage();
    const { profile } = useAuthContext();

    const { id, cpf, user: email, name, phone } = profile;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name || '',
            phone: phone || '',
            email: email || '',
            cpf: cpf || '',
            ab_id: ''
        },
    })

    async function formAction() {
        const validFields = await form.trigger();

        if (validFields) {
            const values = { ...form.getValues(), player_id: id, tournament_id: tournament.id, year: year }

            const response = await tournamentSubscribe('/tournaments/subscribe', values)

            if (response?.error) {
                errorMessage(response);
                return;
            }

            form.reset();

            successMessage({
                title: `${tournament.value} - ${year}`,
                description: `Inscrição do torneio realizada com sucesso!`,
            })
        }
    }

    const handleBlur = (form: any) => {
        form.trigger();
    }

    const handleAgreement = (value: string, field: any) => {
        field.onChange(value)
        form.trigger();
    }

    return (
        <Form {...form}>
            <form action={async () => await formAction()} className="space-y-8" >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome..." {...field} readOnly={name ? true : false} />
                            </FormControl>
                            <FormDescription>
                                Digite seu nome completo
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
                                <Input type="email" placeholder="email@email.com" {...field} readOnly={email ? true : false} />
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
                    name="phone"
                    render={({ field }) => (
                        <FormItem className="flex flex-col items-start">
                            <FormLabel className="text-left">Telefone</FormLabel>
                            <FormControl className="w-full">
                                <PhoneInput defaultCountry='BR' {...field} readOnly={phone ? true : false} />
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
                                    readOnly={cpf ? true : false}
                                />
                            </FormControl>
                            <FormDescription>
                                Digite seu CPF.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="ab_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Matrícula AB</FormLabel>
                            <FormControl>
                                <Input placeholder="AB-9999" {...field} onBlur={() => handleBlur(form)} />
                            </FormControl>
                            <FormDescription>
                                Digite seu matrícula da AB.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {tournament.id === TOURNAMENT_ID.AO && (
                    <FormField
                        control={form.control}
                        name="shirt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tamanho da camiseta</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o tamanho da camiseta" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {SHIRT_SIZE.map(status => (
                                            <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Selecione o tamanho da sua camiseta.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}


                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>TERMO DE RESPONSABILIDADE</AlertTitle>
                    <AlertDescription className='flex flex-col gap-4'>
                        <p className='pt-4'>
                            <b>Datas dos jogos:</b> Estou ciente que o torneio será realizado, preferencialmente, entre as datas previamente informadas pelo ORGANIZADOR, podendo o período de disputa ser estendido por conta de condições climáticas ou outras causas externas. Declaro estar ciente de que disputarei quatro partidas e comprometo-me a realizá-las dentro do prazo de duas semanas cada. Afirmo compreender que as datas reservadas para a realização dos jogos são as dos finais de semana, que adiantamentos ou adiamentos para outras datas podem ocorrer apenas se houver comum acordo entre os adversários.
                        </p>
                        <p>
                            <b>Valor da Inscrição:</b> Concordo com o pagamento de <b>R$ 25,00</b> como inscrição individual no torneio.
                        </p>
                        <p>
                            <b>Pagamento via Pix:</b>  - CNPJ 76.559.830/0001-15
                        </p>
                        <p>
                            Favor enviar comprovante pelo e-mail <a href='mailto:castro@associacaobrasil.com.br' className='text-blue-400 underline'>castro@associacaobrasil.com.br</a>
                        </p>

                        <p>
                            <b>Condições de Saúde:</b> Declaro estar em plenas condições de saúde física e mental para participar do Torneio de Tênis e que não possuo quaisquer condições preexistentes que me impeçam de praticar atividades físicas de alta intensidade.
                        </p>
                        <p>
                            <b>Consulta Cardiológica:</b> Estou ciente de que foi fortemente recomendado pelo ORGANIZADOR a realização de uma consulta cardiológica prévia à minha participação no torneio como medida de precaução à saúde. Declaro que sou o(a) único(a) responsável pela decisão de submeter-me ou não a tal avaliação médica.
                        </p>
                        <p>
                            <b>Reconhecimento de Riscos:</b> Reconheço e entendo que a prática de atividades esportivas, incluindo a participação neste torneio de tênis, envolve riscos inerentes que podem resultar em lesões, traumas, doenças, perdas e até mesmo a morte. Assumo todos os riscos derivados de minha participação.
                        </p>
                        <p>
                            <b>Isenção de Responsabilidade:</b> Por meio deste, isento o ORGANIZADOR, seus diretores, funcionários, voluntários, patrocinadores e demais pessoas associadas à organização do evento, de qualquer responsabilidade por lesões, danos ou prejuízos que eu possa sofrer em decorrência de minha participação neste torneio. Esta isenção de responsabilidade inclui, mas não se limita a, acidentes, atos de violência, perda de equipamentos ou efeitos pessoais por roubo ou qualquer outra circunstância.
                        </p>
                        <p>
                            <b>Emergências Médicas:</b> Autorizo o ORGANIZADOR e seus representantes a tomar as decisões necessárias para o meu atendimento médico em caso de emergência, reconhecendo que qualquer despesa decorrente de tal atendimento será de minha exclusiva responsabilidade.
                        </p>
                        <p>
                            <b>Aceitação de Regras:</b> Comprometo-me a cumprir todas as regras e orientações estabelecidas pelo ORGANIZADOR para a participação no torneio, bem como a respeitar as decisões dos oficiais de partida e demais autoridades do evento.
                        </p>
                        <p>
                            <b>Uso de Imagem:</b> Autorizo o ORGANIZADOR a utilizar, sem qualquer ônus, minhas imagens, nomes, voz, e demais elementos de identidade captados durante a minha participação no torneio, para fins de divulgação e promoção do evento em qualquer meio de comunicação.
                        </p>
                        <p>
                            <b>Pelo presente, afirmo ter lido e compreendido todos os termos deste Termo de Responsabilidade, estando plenamente de acordo com todos os seus termos e condições.</b>
                        </p>

                        <div className='pt-4 pb-4'>
                            <FormField
                                control={form.control}
                                name="agree"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={(value) => handleAgreement(value, field)}
                                                className="flex flex-col space-y-1"
                                            >
                                                <FormItem className="flex items-center space-x-3 space-y-0 cursor-pointer">
                                                    <FormControl>
                                                        <RadioGroupItem value="true" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Concordo
                                                    </FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-3 space-y-0 cursor-pointer">
                                                    <FormControl>
                                                        <RadioGroupItem value="false" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        Discordo
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </AlertDescription>
                </Alert>
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


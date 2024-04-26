import { useForm } from 'react-hook-form';
import { useFormStatus } from 'react-dom';
import z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { ButtonLoading } from '@repo/ui/components/ui/button-loading';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import useToastMessage from '@tennis/components/hooks/useToastMessage';

import { updateFinanceSettings } from '@tennis/lib/actions';
import { formatCurrencyInput, formattedBrazilianCurrency } from '@tennis/lib/utils';

const formUserSchema = z.object({
    yearly_payment: z.string().min(1, { message: "Campo obrigatório" }),
    tournament_payment: z.string().min(1, { message: "Campo obrigatório" }),
})


function FinanceForm({ data }: { data: any }) {
    const { successMessage, errorMessage } = useToastMessage();

    const form = useForm<z.infer<typeof formUserSchema>>({
        resolver: zodResolver(formUserSchema),
        defaultValues: {
            yearly_payment: formattedBrazilianCurrency(data.yearly_payment) || "",
            tournament_payment: formattedBrazilianCurrency(data.tournament_payment) || "",
        },
    })

    async function formAction() {
        const validFields = await form.trigger();

        if (validFields) {
            const response = await updateFinanceSettings(form.getValues());

            if (response?.error) {
                errorMessage(response);
                return;
            }

            successMessage({
                title: `Financeiro`,
                description: `Valores atualizados com sucesso.`,
            })
        }
    }

    return (
        <Form {...form}>
            <form action={async () => await formAction()} className="space-y-8 mt-4 " >
                <FormField
                    control={form.control}
                    name="yearly_payment"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Anuidade:</FormLabel>
                            <FormControl>
                                <Input placeholder="Valor da anuidade" {...field} className='w-[150px]' 
                                  onChange={(event) =>
                                    field.onChange(formatCurrencyInput(event.target.value))
                                }/>
                            </FormControl>
                            <FormDescription>
                                Digite o valor da anuidade em R$.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tournament_payment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Valor do torneio:</FormLabel>
                            <FormControl>
                                <Input placeholder="Valor do torneio" {...field} className='w-[150px]'
                                     onChange={(event) =>
                                        field.onChange(formatCurrencyInput(event.target.value))
                                    }/>
                            </FormControl>
                            <FormDescription>
                                Digite o valor das inscrições para os torneios em R$.
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

export default FinanceForm;
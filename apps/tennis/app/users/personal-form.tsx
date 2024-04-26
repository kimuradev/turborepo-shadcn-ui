import { Input } from "@repo/ui/components/ui/input";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import { Separator } from '@repo/ui/components/ui/separator';
import { PhoneInput } from "@repo/ui/components/ui/phone-input";
import { formatCpf } from "@/lib/utils";

type PersonalFormProps = {
    form: any,
    disableCpfField?: boolean,
    handleBlur: (form: any) => void
}

export default function PersonalForm({ form, disableCpfField = false, handleBlur }: PersonalFormProps) {
    return (
        <section className="flex flex-col gap-6 w-full">
            <div>
                <h1>Dados pessoais </h1>
                <Separator className='mt-2' />
            </div>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                            <Input placeholder="Nome completo" {...field} onBlur={() => handleBlur(form)} />
                        </FormControl>
                        <FormDescription>
                            Digite seu nome completo.
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
                                    readOnly={disableCpfField}
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
        </section>
    )
}
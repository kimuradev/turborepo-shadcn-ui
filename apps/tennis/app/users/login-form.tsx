import { Input } from "@repo/ui/components/ui/input";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import { Separator } from '@repo/ui/components/ui/separator';
import { formatCpf } from "@/lib/utils";

type LoginFormProps = {
    disableEmailField?: boolean,
    showCpf?: boolean,
    form: any,
    handleBlur: (form: any) => void
}

export default function LoginForm({ form, disableEmailField = false, showCpf = false, handleBlur }: LoginFormProps) {
    return (
        <section className="flex flex-col gap-6 w-full">
            <div>
                <h1> Dados de login </h1>
                <Separator className='mt-2' />
            </div>

            {showCpf && (
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
            )}

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Email" type='email' {...field} onBlur={() => handleBlur(form)} readOnly={disableEmailField} />
                        </FormControl>
                        <FormDescription>
                            {disableEmailField ? 'Esse é seu e-mail para login.' : 'Digite um e-mail válido. Esse será seu e-mail para login.'}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                            <Input placeholder="Senha" type="password" {...field} onBlur={() => handleBlur(form)} />
                        </FormControl>
                        <FormDescription>
                            {disableEmailField ? 'Cadastre uma nova senha' : 'Digite sua senha'}.
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
                            {disableEmailField ? 'Confirme sua nova senha.' : 'Confirme sua senha.'}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </section>
    )
}
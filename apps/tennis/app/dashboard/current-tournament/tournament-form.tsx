import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import { TOURNAMENT_DICTIONARY } from "@/lib/constants";
import SaveButton from './tournament-button';
import { Checkbox } from "@ui/components/ui/checkbox";
import { Input } from "@ui/components/ui/input";

function TournamentForm({ form, formAction }: any) {
    const items = [{ id: 'none', value: 'Nenhum' }, ...TOURNAMENT_DICTIONARY];

    return (
        <Form {...form}>
            <form action={async () => await formAction()} className="space-y-8">
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Periodo dos jogos</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: Junho à Agosto" {...field} />
                            </FormControl>
                            <FormDescription>
                                Digite os meses de inicio e fim do torneio.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tournaments"
                    render={() => (
                        <FormItem>
                            <FormLabel>Selecione os torneios: </FormLabel>
                            {items.map((item: any) => (
                                <FormField
                                    key={item.id}
                                    control={form.control}
                                    name="tournaments"
                                    render={({ field }) => {
                                        const isNoneSelected = field.value?.includes('none');
                                        const isItemDisabled = item.id !== 'none' && isNoneSelected;
                                        return (
                                            <FormItem
                                                key={item.id}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.id)}
                                                        onCheckedChange={(checked) => {
                                                            if (item.id === 'none' && checked) {
                                                                field.onChange(['none']);
                                                            } else if (item.id === 'none' && !checked) {
                                                                field.onChange([]);
                                                            } else {
                                                                return checked
                                                                    ? field.onChange([...field.value.filter((v: any) => v !== 'none'), item.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value: any) => value !== item.id
                                                                        )
                                                                    );
                                                            }
                                                        }}
                                                        disabled={isItemDisabled}
                                                    />
                                                </FormControl>
                                                <FormLabel className="text-sm font-normal">
                                                    {item.value}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* <FormField
                    control={form.control}
                    name="tournament"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger >
                                            <SelectValue placeholder="Torneios..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {[{ id: 'none', value: 'Nenhum' }, ...TOURNAMENT_DICTIONARY].map((tournament: { id: number | string, value: string }) => (
                                            <SelectItem key={tournament.id} value={tournament.id.toString()}>{tournament.value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                <SaveButton />
            </form>
        </Form>
    )
}

export default TournamentForm;
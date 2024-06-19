import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form";
import { TOURNAMENT_DICTIONARY } from "@/lib/constants";
import SaveButton from './tournament-button';
import { Checkbox } from "@ui/components/ui/checkbox";

function TournamentForm({ form, formAction }: any) {
    const items = [{ id: 'none', value: 'Nenhum' }, ...TOURNAMENT_DICTIONARY];
    return (
        <Form {...form}>
            <form action={async () => await formAction()} className="space-y-8">
                <FormField
                    control={form.control}
                    name="tournaments"
                    render={() => (
                        <FormItem>
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
                <SaveButton />
            </form>
        </Form>
    )
}

export default TournamentForm;
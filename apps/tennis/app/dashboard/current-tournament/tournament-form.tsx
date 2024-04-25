import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TOURNAMENT_DICTIONARY } from "@/lib/constants";
import SaveButton from './tournament-button';

function TournamentForm({ form, formAction } : any) {
    return (
        <Form {...form}>
            <form action={async () => await formAction()} className="space-y-8">
                <FormField
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
                                        {TOURNAMENT_DICTIONARY.map((c: any) => (
                                            <SelectItem key={c.id} value={c.id.toString()}>{c.value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
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
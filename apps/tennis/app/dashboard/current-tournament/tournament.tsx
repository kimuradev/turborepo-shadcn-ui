import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { editActiveTournament } from "@/lib/actions";
import useToastMessage from "@repo/ui/components/hooks/useToastMessage";

import TournamentForm from "./tournament-form";

const formSchema = z.object({
    tournament: z.string().min(1, { message: 'Campo obrigatório' }),
})

export default function Tournament({ handleCloseModal }: { handleCloseModal : () => void }) {
    const { successMessage, errorMessage } = useToastMessage();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            tournament: "",
        },
    })
   
    async function formAction() {
        const validFields = await form.trigger();

        if (validFields) {
            const response = await editActiveTournament({ id:form.getValues("tournament"), isActive: true });

            if (response?.error) {
                errorMessage(response)
                return;
            }

            successMessage({
                title: "Torneio",
                description: "Torneio ativado com sucesso."
            })

            handleCloseModal();
        }
    }

    return (
        <TournamentForm form={form} formAction={formAction} />
    )
}

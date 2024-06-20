import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { editActiveTournamentSubscription } from "@/lib/actions";
import useToastMessage from "@repo/ui/components/hooks/useToastMessage";

import TournamentForm from "./tournament-form";

export default function Tournament({ handleCloseModal }: { handleCloseModal : () => void }) {
    const { successMessage, errorMessage } = useToastMessage();
    const [isRequired, setIsRequired] = useState(true);

    const formSchema = z.object({
        startDate: isRequired? z.string().min(1, { message: 'Campo obrigatório' }) : z.string(),
        endDate: isRequired? z.string().min(1, { message: 'Campo obrigatório' }) : z.string(),
        tournaments: z.array(z.string().min(1, { message: 'Campo obrigatório' })),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            startDate: '',
            endDate: '',
            tournaments: [],
        },
    })

    const tournamentWatch = form.watch('tournaments')

    useEffect(() => {
        if (tournamentWatch.find(item => item === "none")) {
            setIsRequired(false);
        } else {
            setIsRequired(true);
        }

    }, [tournamentWatch])
   
    async function formAction() {
        const validFields = await form.trigger();

        if (validFields) {
            const response = await editActiveTournamentSubscription({ startDate: form.getValues("startDate"), endDate: form.getValues("endDate"), tournaments: form.getValues("tournaments") });

            if (response?.error) {
                errorMessage(response)
                return;
            }

            successMessage({
                title: "Torneio",
                description: "Torneio com inscrição aberta com sucesso."
            })

            handleCloseModal();
        }
    }

    return (
        <TournamentForm form={form} formAction={formAction} />
    )
}

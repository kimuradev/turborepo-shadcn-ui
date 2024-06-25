import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { editActiveTournament } from "@/lib/actions";
import useToastMessage from "@repo/ui/components/hooks/useToastMessage";

import TournamentForm from "./tournament-form";
import { useEffect, useState } from "react";



export default function Tournament({ handleCloseModal }: { handleCloseModal : () => void }) {
    const { successMessage, errorMessage } = useToastMessage();
    const [isRequired, setIsRequired] = useState(true);

    const formSchema = z.object({
        description: isRequired? z.string().min(1, { message: 'Campo obrigatório' }) :  z.string(),
        tournaments: z.array(z.string().min(1, { message: 'Campo obrigatório' })),
        year: isRequired ? z.string().min(1, { message: 'Campo obrigatório' }) : z.string(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: "",
            tournaments: [],
            year: ''
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
            const response = await editActiveTournament({ 
                description: form.getValues("description"), 
                tournaments: form.getValues("tournaments"),
                year: form.getValues("year")
            });

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

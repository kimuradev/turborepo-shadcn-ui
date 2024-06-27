import { useToast } from "../ui/use-toast";

export default function useToastMessage() {

    const { toast } = useToast();

    const successMessage = ({ title, description }: { title: string, description: string }) => {
        toast({
            title,
            description,
            variant: "success"
        })
    }

    const alertMessage = ({ title, description }: { title: string, description: string }) => {
        toast({
            title,
            description,
            variant: "alert"
        })
    }


    const errorMessage = (response?: any) => {
        if (response?.message) {
            toast({
                title: "Ops!",
                description: response?.message,
                variant: "destructive"
            })
            return;
        } else if (response?.error) {
            toast({
                title: "Ops!",
                description: response?.error.split('Error: ')[1] || "Algo de errado aconteceu. Tente novamente mais tarde.",
                variant: "destructive"
            })
            return;
        }

    }

    return {
        successMessage,
        alertMessage,
        errorMessage
    }
}
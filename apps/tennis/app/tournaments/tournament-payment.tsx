import { useState } from "react";
import clsx from 'clsx';
import { Check, Clock, X } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import useToastMessage from "@/components/hooks/useToastMessage";
import { postApiWithCredentials } from "@/lib/fetchWithCredentials";

type TournamentPaymentProps = {
    email: string | undefined, tournamentId: string, year: string, status: "paid" | "pending" | "irregular", isActive: boolean
}

function TournamentPayment({ email, tournamentId, year, status, isActive }: TournamentPaymentProps) {
    const { errorMessage, alertMessage, successMessage } = useToastMessage();
    const [checked, setChecked] = useState(status === 'paid' ? true : false);
    const [paymentStatus, setPaymentStatus] = useState(status);

    const handleChangePayment = async () => {
        setChecked(state => !state)
        await updatePaymentStatus()
    }

    const updatePaymentStatus = async () => {
        try {
            const response = await postApiWithCredentials(`/tournaments/update-payment`, { email: email, tournament_id: tournamentId, year: year, status: checked ? 'pending': 'paid' })

            setPaymentStatus(response.data.payment_status);

            if (response.data.payment_status === 'paid') {
                successMessage({
                    title: 'Pagamento confirmado!',
                    description: 'Os organizadores farão a conferência do pagamento em breve.'
                })
            } else {
                alertMessage({
                    title: 'Pagamento pendente',
                    description: 'Jogador deve regularizar o pagamento até o fim do torneio.'
                })
            }
        } catch (err) {
            errorMessage();
        } finally {
            // setIsLoading(false)
        }
    }


    const renderMessage = (status: string) => {
        switch (status) {
            case 'pending':
                return (
                    <div className="flex gap-1">
                        <Clock className="h-3 w-3 stroke-pending-500" />
                        <span>Pagamento pendente</span>
                    </div>
                )

            case 'irregular':
                return (
                    <div className="flex gap-1">
                        <X className="h-3 w-3 stroke-red-500" />
                        <span>Situação irregular</span>
                    </div>
                )
            default:
                return (
                    <div className="flex gap-1">
                        <Check className="h-3 w-3 stroke-green-500" />
                        <span>Pagamento efetuado</span>
                    </div>
                )
        }
    }

    return (
        <Alert
            className={clsx(
                `flex flex-col border-none md:flex-row justify-between items-center gap-4 w-full`,
                {
                    'bg-transparent  justify-center text-green-600': paymentStatus === 'paid',
                    'bg-transparent  text-orange-600': paymentStatus === 'pending',
                    'bg-transparent text-red-600': paymentStatus === 'irregular',
                    'visible': isActive,
                    'invisible': !isActive
                },
            )}>
            <div className="flex items-center gap-2 w-full">
                <Switch
                    id="payment_status"
                    checked={checked || paymentStatus === 'paid'}
                    onCheckedChange={handleChangePayment}
                />
                <Label htmlFor="payment_status" className={clsx(
                    'text-green-600',
                    {
                        ' text-orange-600': paymentStatus === 'pending',
                        ' text-red-600': paymentStatus === 'irregular',
                    },
                )}>{renderMessage(paymentStatus)}</Label>
            </div>
        </Alert>
    )
}

export default TournamentPayment;
import { useState } from "react";
import clsx from 'clsx';
import { Check, Clock, X } from "lucide-react";

import { Alert } from "@repo/ui/components/ui/alert";
import { Switch } from "@repo/ui/components/ui/switch";
import { Label } from "@repo/ui/components/ui/label";
import useToastMessage from "@/components/hooks/useToastMessage";
import Spinner from "@repo/ui/components/ui/spinner";
import { putApiWithCredentials } from "@/lib/fetchWithCredentials";

function Payment({ userId, status }: { userId: string, status: "paid" | "pending" | "irregular" }) {
    const { errorMessage, successMessage } = useToastMessage();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentStatus, setIsPaid] = useState(status);

    const handleChangePayment = async () => {
        await updatePaymentStatus()
    }

    const updatePaymentStatus = async () => {
        setIsLoading(true);
        try {
            const response = await putApiWithCredentials(`/users/update-payment`, { user_id: userId, status: 'paid' })

            setIsPaid(response.data.payment_status);

            successMessage({
                title: 'Pagamento confirmado!',
                description: 'Os organizadores farão a conferência do pagamento em breve.'
            })
        } catch (err) {
            errorMessage();
        } finally {
            setIsLoading(false)
        }
    }

    const renderMessage = (status: string) => {
        switch (status) {
            case 'pending':
                return 'Sua anuidade ainda está pendente.'
            case 'irregular':
                return 'Sua anuidade está irregular.'
            default:
                return 'Sua anuidade está em dia.'
        }
    }

    const renderIcon = (status: string) => {
        switch (status) {
            case 'pending':
                return <Clock className="h-5 w-5 stroke-pending-500" />
            case 'irregular':
                return <X className="h-5 w-5 stroke-red-500" />
            default:
                return <Check className="h-5 w-5 stroke-green-500" />
        }
    }

    if (isLoading) {
        return <div className="flex flex-col md:flex-row justify-center items-center gap-4 border  md:w-[700px] m-4 p-4">
            <Spinner />
        </div>
    }

    return (
        <Alert
            className={clsx(
                'flex flex-col md:flex-row justify-between items-center gap-4 border  md:w-[700px] m-4 p-4',
                {
                    'bg-green-200 border-green-500 justify-center text-green-600': paymentStatus === 'paid',
                    'bg-orange-200 border-orange-500 text-orange-600': paymentStatus === 'pending',
                    'bg-red-200 text-red-600': paymentStatus === 'irregular',
                },
            )}>
            <div className="flex items-center justify-center gap-2">
                {renderIcon(paymentStatus)}
                <h5
                    className={clsx(
                        '',
                        {
                            ' text-green-600': paymentStatus === 'paid',
                            ' text-orange-600': paymentStatus === 'pending',
                            ' text-red-600': paymentStatus === 'irregular',
                        },
                    )}>{renderMessage(paymentStatus)}</h5>
            </div>
            {paymentStatus !== "paid" && (
                <div className="flex items-center justify-center gap-2">
                    <Switch
                        id="payment_status"
                        onCheckedChange={handleChangePayment}
                    />
                    <Label htmlFor="payment_status">Já foi pago?</Label>
                </div>
            )}
        </Alert>
    )
}

export default Payment;
import { useEffect, useState } from "react"
import { ArrowUpDown } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import sortBy from 'lodash/sortBy';

import useToastMessage from "@tennis/components/hooks/useToastMessage"
import { Button } from "@repo/ui/components/ui/button"
import { Switch } from "@repo/ui/components/ui/switch"
import Tag from "@repo/ui/components/ui/tag"

import { getApi } from "@tennis/lib/fetch"
import { putApiWithCredentials } from "@tennis/lib/fetchWithCredentials"
import { type PaymentStatus } from "@tennis/lib/definitions"

export type UserProps = {
    id: string
    player: string,
    payment_status: PaymentStatus,
}

type UserUpdateProps = Omit<UserProps, 'player'>

export function useYearlyTable({ year }: { year : string}) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const { successMessage, alertMessage, errorMessage } = useToastMessage();

    useEffect(() => {
        setIsLoading(true)

        const fetchData = async () => {
            try {
                const response = await getApi(`/finance/yearly?year=${year}`);
                const orderedByName: any = sortBy(response, ['player_name'])
                setData(orderedByName);
            } catch (err) {
                errorMessage();
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [year])

    const updatePaymentStatus = async (id: string, checked: boolean) => {
        try {
            const response = await putApiWithCredentials(`/finance/update-payment-status`,
                {
                    user_id: id,
                    status: checked ? 'paid' : 'pending',
                    year: year,
                })

            const userToUpdate: any = data.find((user: any) => user.id === response.data.id);
            const updatedData: any = data.map((user: UserUpdateProps) => {
                if (userToUpdate && user.id === userToUpdate.id) {
                    return { ...user, payment_status: response.data.payment_status };
                }
                return user;
            });

            setData(updatedData);

            if (checked) {
                successMessage({
                    title: 'Pagamento confirmado!',
                    description: 'Jogador com anuidade em dia.'
                })
            } else {
                alertMessage({
                    title: 'Pagamento pendente',
                    description: 'Jogador deve regularizar o pagamento para se inscrever no torneio.'
                })
            }
        } catch (err) {
            errorMessage();
        }
    }

    const columns: ColumnDef<UserProps>[] = [
        {
            accessorKey: "player_name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Jogador
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "payment_status",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Anuidade
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => {
                const paymentStatus = row.getValue("payment_status");

                switch (paymentStatus) {
                    case 'paid':
                        return <Tag label='Paga' variant="success" />
                    case 'pending':
                        return <Tag label='Conferir' variant='pending' />
                    case 'irregular':
                        return <Tag label='Não paga' variant='fail' />
                    default:
                        break;
                }
            }
        },
        {
            id: "actions",
            accessorKey: "payment_status",
            header: ({ column }) => {
                return (
                    <span>Já foi pago?</span>
                )
            },
            cell: ({ row }) => {
                const [checked, setChecked] = useState(false)
                const paymentStatus = row.getValue("payment_status");

                const handleChangePayment = async ({ id, checked }: { id: string, checked: boolean }) => {
                    await updatePaymentStatus(id, checked)

                }
                return (
                    <>
                        <Switch
                            checked={checked || paymentStatus === 'paid'}
                            onCheckedChange={(value) => { setChecked(!checked); handleChangePayment({ id: row.original.id, checked: value }) }}
                        />
                    </>
                )
            },
        }
    ]

    return [{
        isLoading,
        data,
        columns
    },]
}


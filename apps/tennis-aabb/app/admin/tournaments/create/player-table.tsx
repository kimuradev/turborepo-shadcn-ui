import { useEffect, useState } from 'react';
import Spinner from "@repo/ui/components/ui/spinner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@repo/ui/components/ui/table"
import Tag from "@repo/ui/components/ui/tag";
import { Switch } from "@repo/ui/components/ui/switch";
import { postApiWithCredentials } from '@/lib/fetchWithCredentials';
import useToastMessage from '@repo/ui/components/hooks/useToastMessage';

function PlayerTable({ players, isLoading, tournament, year }: { players: any, isLoading: boolean, tournament: string, year: string }) {
    const [playerData, setPlayerData] = useState([]);
    const { successMessage, alertMessage, errorMessage } = useToastMessage();

    useEffect(() => {
        setPlayerData(players)
    }, [players])

    const updatePaymentStatus = async (checked: boolean, player: any) => {
        try {
            const response = await postApiWithCredentials(`/tournaments/update-payment/admin`,
                {
                    player_id: player.player_id,
                    tournament_key: tournament,
                    year: year,
                    status: checked ? 'paid' : 'pending'
                })

            const { data } = response;

            const playerToUpdate = players.find((player: any) => player.player_id === data.player_id);

            if (playerToUpdate) {
                // Update only fields that are different
                Object.keys(data).forEach(key => {
                    if (playerToUpdate[key] !== data[key]) {
                        playerToUpdate[key] = data[key];
                    }
                });
            }

            setPlayerData(players)

            if (checked) {
                successMessage({
                    title: 'Pagamento confirmado!',
                    description: 'Jogador apto para se inscrever no torneio.'
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

    const handleChangePayment = async (value: boolean, player: any) => {
        await updatePaymentStatus(value, player)
    }

    const renderPayment = ({ playerPaymentStatus, adminPaymentStatus }: { playerPaymentStatus: string, adminPaymentStatus: string }) => {
        if (playerPaymentStatus === 'paid' && adminPaymentStatus === 'paid') {
            return <Tag label='Pago' variant="success" />
        } else if (playerPaymentStatus === 'paid' && adminPaymentStatus === 'pending') {
            return <Tag label='Conferir' variant='pending' />
        } else if (playerPaymentStatus === 'pending' && adminPaymentStatus === 'pending') {
            return <Tag label='Não pago' variant='fail' />
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    if (!players.length) {
        return (
            <span className="text-muted-foreground text-sm">Nenhum jogador inscrito.</span>
        )
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[300px]">Jogador</TableHead>
                    <TableHead className="text-center">Pontos</TableHead>
                    <TableHead className="text-center">Pagamento</TableHead>
                    <TableHead className="text-right">Já foi pago?</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {playerData.map((player: any) => (
                    <TableRow>
                        <TableCell >
                            <div className="w-[300px]">
                                <p className="truncate">{player.player_name}</p>
                            </div>
                        </TableCell>
                        <TableCell className="text-center">{player.points}</TableCell>
                        <TableCell >
                            {
                                renderPayment({ playerPaymentStatus: player.payment_status, adminPaymentStatus: player.admin_payment_status })
                            }
                        </TableCell>
                        <TableCell className="flex justify-end">
                            <Switch
                                checked={player.payment_status === 'paid' && player.admin_payment_status === 'paid'}
                                onCheckedChange={(value) => handleChangePayment(value, player)}
                            />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default PlayerTable;
import Spinner from '@repo/ui/components/ui/spinner';
import { getApi } from '@/lib/fetch';
import { formattedBrazilianCurrency } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';

// const colors = ['#0091d2', '#FF8042', '#00C49F', '#0088FE', 'black'];

export function TournamentBarChart({ year, finance, isLoading: isFinanceLoading  }: { year: string, finance: { tournament_payment : string}, isLoading: boolean }) {
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(isFinanceLoading)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await getApi(`/finance/tournament-subscription?year=${year}`);
                const sumEmDia = response.reduce((acc: any, curr: any) => acc + curr['Em dia'], 0);

                setTotal(sumEmDia)
                setData(response);
            } catch (err) {
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [year])

    if (isLoading) {
        return <div className='flex justify-center items-center w-[500px] h-[300px]'><Spinner /></div>
    }

    if (data.every((d: any) => d['Em dia'] === 0 && d['Pendente'] === 0)) {
        return (
            <div className='flex justify-center items-center w-[500px] h-[300px]'>
                Nenhum resultado encontrado.
            </div>
        )
    }

    return (
        <div>
            <div className="text-2xl font-bold  text-green-600">R$ {formattedBrazilianCurrency((total * parseInt(finance.tournament_payment, 10)).toString())}</div>
            <p className="text-xs text-muted-foreground">
                total arrecadado
            </p>
            <div className="flex justify-center items-center h-[280px] w-[500px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        stackOffset="sign"
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />

                        <Legend />
                        <ReferenceLine y={0} stroke="#000" />

                        <Bar dataKey="Em dia" fill="#00C49F" stackId="stack" />
                        <Bar dataKey="Pendente" fill="#FF8042" stackId="stack" />

                        {/* <Bar dataKey="Pendente" stackId="stack" >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar> */}

                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
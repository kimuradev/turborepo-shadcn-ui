import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import Spinner from '@repo/ui/components/ui/spinner';
import { getApi } from '@/lib/fetch';
import { formattedBrazilianCurrency } from '@/lib/utils';

const COLORS = ['#00C49F', '#FF8042', 'red'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function AnuityPieChart({ year, finance, isLoading: isFinanceLoading }: { year: string, finance: { yearly_payment: string }, isLoading: boolean }) {
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(isFinanceLoading)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await getApi(`/finance/anuity?year=${year}`);
                setTotal(response.find((res: { name: string }) => res.name === 'Em dia').value)
                setData(response);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [year])

    if (isLoading) {
        return <div className='flex justify-center items-center h-[300px]'><Spinner /></div>
    }

    if (data.every((d: { value: number }) => d.value === 0)) {
        return (
            <div className='flex justify-center items-center h-[300px]'>
                Nenhum resultado encontrado.
            </div>
        )
    }
    return (
        <div>
            <div className="text-2xl font-bold text-green-600">R$ {formattedBrazilianCurrency((total * parseInt(finance.yearly_payment, 10)).toString())}</div>
            <p className="text-xs text-muted-foreground">
                total arrecadado
            </p>
            <div className="flex justify-center items-center h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend className='pt-4' />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}


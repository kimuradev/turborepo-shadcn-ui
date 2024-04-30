"use client"

import { CalendarX } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export default function Monthly({ data }: { data: any }) {
  if (!data.length) {
    return (
      <div className="flex flex-col justify-center items-center">
        <CalendarX className="w-[50px] h-[50px] stroke-primary mb-4" />
        <p className="text-sm text-muted-foreground">Nenhum jogo até o momento. </p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}
      >
        <XAxis
          dataKey="month"
          stroke="#888888"
          scale="auto"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          padding={{ left: 30, right: 10 }}
        />
        <YAxis
          dataKey="total"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
          type="number"
          domain={[0, 100]}
        />
        <Tooltip cursor={{ fill: '#fff' }} />
        <Bar dataKey="total" fill="#fcd34d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

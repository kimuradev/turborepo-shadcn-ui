"use client"

import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams()
    const valid = searchParams.get('valid')

    if (valid?.toString() === 'true') {
        return (
            <div className="flex w-full h-full items-center justify-center">
                <ShieldCheck className="w-16 h-16 stroke-green-300 mr-2" />
                <div className="flex flex-col">
                <p className="text-green-600">Usuário validado com sucesso. </p>
                <p>Faça o seu login e atualize seu cadastro.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex w-full h-full items-center justify-center">
            <ShieldAlert className="w-8 h-8 stroke-red-400 mr-2" />
            <span>Não foi possível validar seu usuário. Tente normalmente mais tarde.</span>
        </div>
    )
}
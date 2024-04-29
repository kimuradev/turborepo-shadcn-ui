"use client"

import { getApi } from "@/lib/fetch"
import isAuth from "@/components/hooks/isAuth"
import { useEffect, useState } from "react"
import useToastMessage from "@repo/ui/components/hooks/useToastMessage"
import Spinner from "@repo/ui/components/ui/spinner"
import { useAuthContext } from "@/app/context/auth-context"
import EditUserForm from "./edit-form"
import Payment from "./payment"

type ForgotProps = {
    params: {
        id: string,
    },
    searchParams: {
        token: string
    }
}

function Page({ params, searchParams }: ForgotProps) {
    const { errorMessage } = useToastMessage();
    const { isAdmin } = useAuthContext();
    const [data, setData] = useState<any>({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { token } = searchParams;
                const url = token ? `/users/${params.id}?token=${searchParams.token}` : `/users/${params.id}`
                const response = await getApi(url)

                setData(response.data);
            } catch (err) {
                errorMessage();
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [])

    return (
        <div className="flex flex-1 flex-col">
            <h2 className="font-bold text-lg mb-10">Editar usuário</h2>

            {isLoading ? (<Spinner />) : (
                <div className="flex flex-col justify-center items-center">
                    {!isAdmin && (
                        <Payment userId={params.id} status={data?.payment_status} />
                    )}

                    <div className="flex justify-center items-center w-full">
                        <EditUserForm data={data} userId={params.id} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default isAuth(Page)
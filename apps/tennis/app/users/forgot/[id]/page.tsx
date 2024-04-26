import { getApi } from "@/lib/fetch"
import ForgotPassword from "./forgot-password";

type ForgotProps = {
    params: {
        id: string,
    },
    searchParams: {
        token: string
    }
}

async function Page({ params, searchParams }: ForgotProps) {
    const response = await getApi(`/users/${params.id}?token=${searchParams.token}`)

    return (
        <div className="flex flex-1 flex-col">
            <h2 className="font-bold text-lg mb-10">Editar usuário</h2>
            <div className="flex justify-center items-center">
                <ForgotPassword data={response.data} />
            </div>
        </div>
    )
}

export default Page
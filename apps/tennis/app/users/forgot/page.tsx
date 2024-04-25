import ForgotForm from "./forgot-form"

function Page() {
    return (
        <div className="flex flex-1 flex-col">
            <h2 className="font-bold text-lg mb-10">Esqueci minha senha</h2>
            <div className="flex justify-center items-center">
                <ForgotForm />
            </div>
        </div>
    )
}

export default Page
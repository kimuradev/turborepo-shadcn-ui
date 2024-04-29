import RegisterForm from "./register-form"

function Page() {
    return (
        <div className="flex flex-1 flex-col">
            <h2 className="font-bold text-lg mb-10">Cadastrar usuário</h2>
            <div className="flex justify-center items-center">
                <RegisterForm />
            </div>
        </div>
    )
}

export default Page
import { Button } from "@repo/ui/components/ui/button"
import { ButtonLoading } from "@repo/ui/components/ui/button-loading"
import { useFormStatus } from "react-dom"

export default function SaveButton() {
    const { pending } = useFormStatus()
    return (
        <div className='flex justify-end'>
            {!pending ? <Button type="submit">Salvar</Button> : <ButtonLoading />}
        </div>
    )
}
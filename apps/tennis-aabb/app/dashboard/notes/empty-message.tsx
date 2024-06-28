import { useAuthContext } from "@/app/context/auth-context";
import { Button } from "@ui/components/ui/button";

type EmptyMessageProps = {
    handleAdd: () => void
}

export default function EmptyMessage({ handleAdd }: EmptyMessageProps) {
    const { isAdmin, signed } = useAuthContext()

    return (
        <>
            {
                isAdmin && signed && (
                    <div className="border rounded border-dashed border-primary mt-4 mb-4 p-2 max-h-[240px] flex justify-center">
                        <Button variant="link" onClick={handleAdd}>Adicionar mensagens no mural de recados</Button>
                    </div>
                )
            }
        </>
    )



}
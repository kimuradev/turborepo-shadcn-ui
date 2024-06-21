import React from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { ButtonLoading } from "@repo/ui/components/ui/button-loading";
import { type DialogRemoveUserProps } from "@/lib/definitions";
import { removeUser } from "@/lib/actions";

export default function DialogRemoveUser({ isOpen = false, data, handleCancel, handleRemoveUser }: DialogRemoveUserProps) {
  return (
    <Dialog open={isOpen} onOpenChange={handleCancel} >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remover usuário</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <p className="text-sm"><strong>CPF:</strong> {data.cpf}</p>
        <p className="text-sm"><strong>E-mail:</strong> {data.email}</p>
        </div>
        <DialogDescription className="mb-4">
          Você tem certeza que deseja <strong>remover</strong> esse usuário?
        </DialogDescription>
        <DialogFooter>
          <form action={async () => {
            const response = await removeUser({ id : data.id })
            handleRemoveUser(response);
          }}>
            <DialogButtons handleCancel={handleCancel} />
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DialogButtons({ handleCancel }: { handleCancel: () => void }) {
  const { pending } = useFormStatus();

  return (
    <div className="flex gap-2">
      <Button onClick={handleCancel} variant="ghost">Cancelar</Button>
      {!pending ? <Button type="submit">Remover</Button> : <ButtonLoading />}
    </div>
  )
}
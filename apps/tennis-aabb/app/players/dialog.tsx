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
import { type DialogRemovePlayerProps } from "@/lib/definitions";
import { removePlayer } from "@/lib/actions";

export default function DialogRemovePlayer({ isOpen = false, data, handleCancel, handleRemovePlayer }: DialogRemovePlayerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={handleCancel} >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remover jogador</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm">Nome: {data.name}</p>
        </div>
        <DialogDescription className="mb-4">
          Você tem certeza que deseja <strong>remover</strong> esse jogador?
        </DialogDescription>
        <DialogFooter>
          <form action={async () => {
            const response = await removePlayer(data)
            handleRemovePlayer(response);
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
    <>
      <Button onClick={handleCancel} variant="ghost">Cancelar</Button>
      {!pending ? <Button type="submit">Remover</Button> : <ButtonLoading />}
    </>
  )
}
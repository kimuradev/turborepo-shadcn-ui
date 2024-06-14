import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { type DialogResultProps } from "@/lib/definitions";
import TournamentResultForm from "./form";

export default function DialogResult({ isOpen = false, data, handleCancel, tournament, year }: DialogResultProps) {
  return (
    <Dialog open={isOpen} onOpenChange={handleCancel} >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar resultado</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <TournamentResultForm
            data={data}
            player1={data.player1}
            player2={data.player2}
            tournament={tournament}
            year={year}
            handleCloseDialog={handleCancel} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
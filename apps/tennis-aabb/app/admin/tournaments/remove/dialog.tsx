import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { type DialogRemoveTournamentProps } from "@/lib/definitions";
import RemoveTournamentForm from "./remove-form";

export default function DialogRemoveTournament({ isOpen = false, data, handleCancel }: DialogRemoveTournamentProps) {
  return (
    <Dialog open={isOpen} onOpenChange={handleCancel} >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remover torneio</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-sm"><strong>Tourneio:</strong> {data.name}</p>
          <p className="text-sm"><strong>Ano:</strong> {data.year}</p>
        </div>

        <RemoveTournamentForm data={data} handleCancel={handleCancel}/>

      </DialogContent>
    </Dialog>
  );
}
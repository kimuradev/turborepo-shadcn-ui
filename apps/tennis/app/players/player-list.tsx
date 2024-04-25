"use client"

import { useEffect, useState } from "react";

import { DataTable } from "@/components/table/data-table";
import useToastMessage from "@/components/hooks/useToastMessage";
import { STATUS_OPTIONS } from "@/lib/constants";
import { type DialogProps, type Players } from "@/lib/definitions";

import DialogDemo from "@/app/players/dialog"
import { useWindowSize } from "@/components/hooks/useWindowSize";
import { usePlayerTable } from "./table/usePlayerTable";

const input = {
  input: {
    columnId: 'name',
    placeholder: 'Procurar jogador...'
  }
};

const select = {
  select: {
    columnId: 'status',
    placeholder: 'Status...',
    options: STATUS_OPTIONS
  }
}

const filtering = [
  { ...input },
  { ...select }
]


export default function PlayerList({ players: data }: { players: any }) {
  const [dialog, setDialog] = useState<DialogProps>({
    isOpen: false,
    isLoading: false,
    data: { id: '', name: '' },
  })
  const { successMessage, errorMessage } = useToastMessage();
  const { isDesktop } = useWindowSize();

  const [columnVisibility, setColumnVisibility] = useState({
    status: isDesktop
  })

  useEffect(() => {
    setColumnVisibility((state: any) => ({
      ...state,
      status: isDesktop
    }))
  }, [isDesktop])

  const [{ columns },] = usePlayerTable();

  const handleCancel = () => {
    setDialog(state => ({
      ...state,
      isOpen: false
    }))
  }

  const handleRemovePlayer = (response: any) => {
    setDialog(state => ({
      ...state,
      isOpen: false
    }))

    if (response?.error) {
      errorMessage(response)
      return;
    }

    successMessage({
      title: "Deletar Jogador",
      description: "Jogador removido com sucesso."
    })
  }

  return (
    <div className="container mx-auto p-0">
      <DataTable columns={columns} data={data} filtering={filtering} columnVisibility={columnVisibility} />

      <DialogDemo isOpen={dialog.isOpen} isLoading={dialog.isLoading} data={dialog.data} handleCancel={handleCancel} handleRemovePlayer={handleRemovePlayer} />
    </div>
  )
}
"use client"

import { useEffect, useState } from "react";

import { DataTable } from "@repo/ui/components/table/data-table";
import useToastMessage from "@repo/ui/components/hooks/useToastMessage";
import { USER_STATUS_OPTIONS } from "@/lib/constants";
import { type DialogUserProps } from "@/lib/definitions";

import { useWindowSize } from "@repo/ui/components/hooks/useWindowSize";
import { useUserTable } from "./table/useUserTable";
import DialogRemoveUser from "./dialog";

const input = {
  input: {
    columnId: 'email',
    placeholder: 'Procurar e-mail...'
  }
};

const select = {
  select: {
    columnId: 'checked',
    placeholder: 'Status...',
    options: USER_STATUS_OPTIONS
  }
}

const filtering = [
  { ...input },
  { ...select }
]


export default function UserList({ data, isLoading }: { data: any, isLoading?: boolean }) {
  const [dialog, setDialog] = useState<DialogUserProps>({
    isOpen: false,
    isLoading: false,
    data: { id: '', cpf: '', email: '' },
  })
  const { successMessage, errorMessage } = useToastMessage();
  const { isDesktop } = useWindowSize();

  const [columnVisibility, setColumnVisibility] = useState({
    status: isDesktop
  })

  useEffect(() => {
    setColumnVisibility((state) => ({
      ...state,
      status: isDesktop
    }))
  }, [isDesktop])

  // @ts-ignore
  const [{ columns },] = useUserTable({ setDialog });

  const handleCancel = () => {
    setDialog(state => ({
      ...state,
      isOpen: false
    }))
  }

  const handleRemoveUser = (response: any) => {
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
      <DataTable columns={columns} data={data} filtering={filtering} columnVisibility={columnVisibility} isLoading={isLoading} />

      <DialogRemoveUser isOpen={dialog.isOpen} isLoading={dialog.isLoading} data={dialog.data} handleCancel={handleCancel} handleRemoveUser={handleRemoveUser} />
    </div>
  )
}
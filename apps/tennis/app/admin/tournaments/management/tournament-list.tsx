"use client"

import { useEffect, useState } from "react";

import { useAppContext } from "@/app/context/app-context";
import { DataTable } from "@repo/ui/components/table/data-table";
import { YEARS_OPTIONS } from "@/lib/constants";
import { type DialogTournamentProps } from "@/lib/definitions";
import { getApi } from "@/lib/fetch";

import { useTournamentTable } from "./table/useTournamentTable";
import DialogRemoveTournament from "./dialog";

const input = {
  input: {
    columnId: 'name',
    placeholder: 'Procurar torneio...'
  }
};

const select = {
  select: {
    columnId: 'year',
    placeholder: 'Ano...',
    defaultValue: new Date().getFullYear().toString(),
    options: YEARS_OPTIONS
  }
}

const filtering = [
  { ...input },
  { ...select }
]

export default function TournamentList() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading ] = useState(false)
  const [dialog, setDialog] = useState<DialogTournamentProps>({
    isOpen: false,
    isLoading: false,
    data: { key: '', name: '', year: '', classId: '' },
  })
  const { classes, setClasses } = useAppContext();

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const data = await getApi('/tournaments', { cache: 'no-store' });
      setData(data.filter((tournament: any) => tournament.started))
    } finally {
      setIsLoading(false)
    }
  }

  const fetchClassesData = async () => {
    const classesResponse = await getApi('/classes', { cache: 'no-store' });
    setClasses(classesResponse)
  }

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    if (!classes.length) {
      fetchClassesData();
    }
  }, [classes])

  // @ts-ignore
  const [{ columns },] = useTournamentTable({ setDialog });

  const handleCancel = () => {
    setDialog(state => ({
      ...state,
      isOpen: false
    }))
  }

  return (
    <div className="container mx-auto p-0">
      <DataTable columns={columns} data={data} filtering={filtering} isLoading={isLoading} />

      <DialogRemoveTournament isOpen={dialog.isOpen} isLoading={dialog.isLoading} data={dialog.data} handleCancel={handleCancel} />
    </div>
  )
}
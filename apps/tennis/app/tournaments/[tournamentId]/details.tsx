"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Trash2 } from "lucide-react";

import { TOURNAMENT_ID } from "@/lib/constants";
import { deleteApi, getApi, postApi } from "@/lib/fetch";
import { useAppContext } from "@/app/context/app-context";
import { useAuthContext } from "@/app/context/auth-context";
import Spinner from "@repo/ui/components/ui/spinner";
import { type TournamentDetailsProps } from "@/lib/definitions";
import UploadImage from "@/components/upload-image";
import { Button } from "@ui/components/ui/button";

import TournamentTabs from "./tabs";
import FinalsDetails from "./finals/details";
import useToastMessage from "@ui/components/hooks/useToastMessage";

const BANNER_PATH = 'tournamentId';

export default function TournamentDetails({ tournament }: TournamentDetailsProps) {
  const { classes, setClasses, isFinals, setIsFinals } = useAppContext()
  const { isAdmin } = useAuthContext();
  const { successMessage, errorMessage } = useToastMessage();
  const [banner, setBanner] = useState<any>('');
  const searchParams = useSearchParams();
  const [isBannerLoading, setIsBannerLoading] = useState(false);

  const year: any = searchParams.get('year')
  const classId: any = searchParams.get('classId')

  const fetchBanner = async () => {
    const response = await getApi(`/image/${BANNER_PATH}`);
    setBanner(response.data)
  }

  useEffect(() => {
    setIsFinals(tournament === TOURNAMENT_ID.FINALS ? true : false);

    fetchBanner();
  }, [])

  const fetchData = async () => {
    const response = await getApi('/classes');
    setClasses(response)
  }

  if (!classes.length && !isFinals) {
    fetchData();
    return <Spinner />
  }

  const handleUploadImage = async (imageUrl: string) => {
    try {
      const response = await postApi('/image/upload', { path: BANNER_PATH, url: imageUrl });
      setBanner(response.data);

      successMessage({ title: 'Upload', description: 'Banner atualizado com sucesso.' })
    } catch (error) {
      errorMessage(error)
    }

  }

  const handleRemoveImage = async () => {
    try {
      setIsBannerLoading(true);
      await deleteApi(`/image/${BANNER_PATH}`);
      setBanner('');
      successMessage({ title: 'Deletar banner', description: 'Banner removido com sucesso.' })
    } catch (error) {
      errorMessage(error)
    } finally {
      setIsBannerLoading(false)
    }

  }

  return (
    <div>
      <h2 className="text-sm text-muted-foreground mb-6">Ano: {year}</h2>

      {isAdmin && <UploadImage handleUploadImage={handleUploadImage} />}

      {banner && (
        <div className="flex items-center gap-4 mb-4 w-[1200px] h-[100px]">
          <Image src={banner.url} width={1200} height={100} alt="banner image" className="w-[1200px] h-[100px]"/>
          {isAdmin && <Button variant="ghost" className="border rounderd" onClick={handleRemoveImage} disabled={isBannerLoading}><Trash2 className="w-4 h-4 stroke-primary" /></Button>}
        </div>
      )}

      {isFinals ? (
        <FinalsDetails tournament={tournament} year={year} />
      ) : (
        <TournamentTabs classes={classes} tournament={tournament} year={year} classId={classId} />
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from "react";

import Spinner from "@ui/components/ui/spinner";
import { getApi } from "@/lib/fetch";
import TopTen from "./top-ten";

export default function RankingLeader() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      setIsLoading(true)
  
      const fetchData = async () => {
          try {
              const response = await getApi('/ranking-leader?limit=10', { cache: 'no-store'})
              setData(response);
          }  finally {
              setIsLoading(false);
          }
      }
  
      fetchData();
  }, [])

  if (isLoading) {
    return <div className="flex justify-center"><Spinner /></div>
  }

  return (
    <TopTen data={data} />
  )
}
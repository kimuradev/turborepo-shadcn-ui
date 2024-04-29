import { getApi } from "@/lib/fetch";
import TopTen from "./top-ten";

export default async function RankingLeader() {
  const data = await getApi('/ranking-leader?limit=10', { cache: 'no-store'})

  console.log('data: ', data)
  
  return (
    <TopTen data={data} />
  )
}
import { getApi } from "@/lib/fetch";
import Monthly from "./monthly"

export default async function MonthlyGames() {
  const data = await getApi('/games/monthly', { cache: 'no-store' })

  return <Monthly data={data} />
}
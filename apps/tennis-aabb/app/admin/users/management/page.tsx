import { getApi } from "@/lib/fetch";
import UserList from "./user-list";

export default async function Page() {
  const data = await getApi('/users', { cache: 'no-store' });

  return (
      <UserList data={data} />
  )
}
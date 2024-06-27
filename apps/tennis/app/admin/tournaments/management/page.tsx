'use client'

import isAuth from "@/components/hooks/isAuth";
import TournamentList from "./tournament-list";

function Page() {
  return (
      <TournamentList />
  )
}

export default isAuth(Page)
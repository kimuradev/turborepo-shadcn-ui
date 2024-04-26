"use client"

import PlayerForm from "./PlayerForm";
import isAuth from "@/components/hooks/isAuth";

function Player({ player = { id : ''} }: { player?: any }) {
  return (
      <PlayerForm player={player} />
  )
}

export default isAuth(Player)
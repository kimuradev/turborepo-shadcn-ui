"use client"

import orderBy from 'lodash/orderBy'
import { DataTable } from "@repo/ui/components/table/data-table";
import { useSubscriptionTable } from "./table/useSubscriptionTable";

const input = {
  input: {
    columnId: 'player_name',
    placeholder: 'Procurar jogador...'
  }
};

const filtering = [
  { ...input },
]

type TournamentSubscriptionsType = {
    data: {
        points: number,
        player_id: string,
        player_name: string,
        payment_status: string,
        admin_payment_status: string
    }
}

export default function TournamentSubscriptions ({ data } : TournamentSubscriptionsType) {
      // @ts-ignore
      const [{ columns },] = useSubscriptionTable();
    
      return (
        <div className="container mx-auto p-0">
          <DataTable columns={columns} data={orderBy(data, ['player_name'], ['asc'])} filtering={filtering} />
        </div>
      )

}
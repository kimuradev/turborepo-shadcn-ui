import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator"
import Spinner from "@/components/ui/spinner";
import { getApi } from "@/lib/fetch";

import FinanceForm from "./finance-form";

export default function Finance() {
    const [data, setData] = useState({ finance: { yearly_payment: 0, tournament_payment: 0 } })
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const response = await getApi('/settings/finance');
                setData(response);
            } catch (err) {
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    }, [])

    if (isLoading) return <Spinner />

    return (
        <div >
            <h5 className="font-bold text-muted-foreground mb-2">Financeiro</h5>
            <Separator />

            <FinanceForm data={data.finance} />
        </div>
    )
}

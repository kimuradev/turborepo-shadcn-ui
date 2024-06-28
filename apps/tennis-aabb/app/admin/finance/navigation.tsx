import React from "react";
import Link from "next/link";
import { CircleDollarSign, CreditCard, PieChart, Trophy } from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@repo/ui/components/ui/navigation-menu"

export function FinanceNavigation() {
    return (
        <NavigationMenu orientation="vertical">
            <NavigationMenuList className="flex-col items-start">
                <NavigationMenuItem>
                    <div className="flex items-center justify-center gap-2">
                        <CircleDollarSign className="w-4 h-4 stroke-primary" />
                        <NavigationMenuTrigger className="text-primary focus:bg-transparent focus:text-primary hover:underline hover:bg-transparent hover:text-primary m-0 p-0">Financeiro</NavigationMenuTrigger>
                    </div>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild className="hover:bg-primary/10">
                                    <Link
                                        className="flex gap-2 h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/admin/finance/dashboard"
                                    >
                                        <div className="flex gap-2 items-center mb-1 mt-1 text-lg font-medium">
                                            <PieChart className="w-4 h-4" />
                                            Dashboard
                                        </div>
                                        <p className="text-sm text-muted-foreground ">
                                            Resumo financeiro, gráficos do valor total arrecadado, valores por torneio e anuidade.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <li>
                                <Link href="/admin/finance/yearly" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="w-4 h-4" />
                                        <div className="text-sm font-medium leading-none">Anuidade</div>
                                    </div>
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        Status de pagamento da anuidade dos atletas.
                                    </p>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/finance/tournaments" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                    <div className="flex items-center gap-2">
                                        <Trophy className="w-4 h-4" />
                                        <div className="text-sm font-medium leading-none">Torneios</div>
                                    </div>
                                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                        Status de pagamento das inscrições por torneio.
                                    </p>
                                </Link>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

import React from "react";
import Link from "next/link";
import { UserMinus, UserPlus, Users } from "lucide-react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@repo/ui/components/ui/navigation-menu"
import { IS_TRIAL_MODE } from "@/lib/constants";

export function UserNavigation() {
    return (
        <NavigationMenu orientation="vertical" className="z-1">
            <NavigationMenuList className="flex-col items-start">
                <NavigationMenuItem>
                    <div className="flex items-center justify-center gap-2">
                        <Users className="w-4 h-4 stroke-primary" />
                        <NavigationMenuTrigger className="text-primary focus:bg-transparent focus:text-primary hover:underline hover:bg-transparent hover:text-primary m-0 p-0">Jogadores</NavigationMenuTrigger>
                    </div>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li>
                                <Link href="/admin/users/register" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                    <div className="flex items-center gap-2">
                                        <UserPlus className="w-4 h-4" />
                                        <div className="text-sm font-medium leading-none">Registrar jogador</div>
                                    </div>
                                    <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
                                        Criaçao de jogadores.
                                    </p>
                                </Link>
                            </li>
                            <li>
                                {IS_TRIAL_MODE ? (
                                    <Link href="#" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors opacity-50 cursor-default">
                                        <div className="flex items-center gap-2">
                                            <UserMinus className="w-4 h-4" />
                                            <div className="text-sm font-medium leading-none">Remover jogador</div>
                                        </div>

                                        <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
                                            Remoçao e gerenciamento de jogadores.
                                        </p>
                                    </Link>
                                ) : (
                                    <Link href="/admin/users/management" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                        <div className="flex items-center gap-2">
                                            <UserMinus className="w-4 h-4" />
                                            <div className="text-sm font-medium leading-none">Remover jogador</div>
                                        </div>

                                        <p className="line-clamp-3 text-sm leading-snug text-muted-foreground">
                                            Remoçao e gerenciamento de jogadores.
                                        </p>
                                    </Link>
                                )}

                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

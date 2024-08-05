import { useState } from "react"
import Link from "next/link"
import { BarChartBig, LogOut, User } from "lucide-react"
import {
    Avatar,
    AvatarFallback,
} from "@repo/ui/components/ui/avatar"
import { Button } from "@repo/ui/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"
import { ProfileProps } from "@/lib/definitions"
import { getInitialLetterName } from "@/lib/utils"
import { useAuthContext } from "../context/auth-context"

export function Profile({ handleLogout }: { handleLogout: () => {} }) {
    const { profile }: { profile: ProfileProps } = useAuthContext();
    const [open, setOpen] = useState(false)

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback>{getInitialLetterName(profile.name || 'Associação Banco do Brasil')}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{profile.user? profile?.user?.split('@')[0] : ''}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {profile.user}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer w-full hover:bg-primary/20" onClick={() => setOpen(false)}>
                        <BarChartBig className="w-4 h-4 mr-3" />
                        <Link href={'/'} className="w-full">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer w-full hover:bg-primary/20" onClick={() => setOpen(false)}>
                        <User className="w-4 h-4 mr-3" />
                        <Link href={`/users/${profile?.id}`} className="w-full">Perfil</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer w-full hover:bg-primary/20" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-3" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

"use client"

import Link from 'next/link';
import { Home, Trophy, Medal, Users, BookOpen, CalendarDays, UserCog, CircleDollarSign, Settings } from 'lucide-react';
import { Button } from '@repo/ui/components/ui/button';
import { Separator } from '@repo/ui/components/ui/separator';
import { useAuthContext } from '@/app/context/auth-context';
import { URL } from '@/lib/constants';
import { FinanceNavigation } from '@/app/admin/finance/navigation';

const navigation = [
    { link: URL.dashboard, label: 'Home', icon: <Home className='w-4 h-4 mr-2' /> },
    { link: URL.ranking, label: 'Ranking', icon: <Medal className='w-4 h-4 mr-2' /> },
    { link: URL.tournaments, label: 'Torneios', icon: <Trophy className='w-4 h-4 mr-2' /> },
    { link: URL.players, label: 'Jogadores', icon: <Users className='w-4 h-4 mr-2' /> },
    { link: URL.rules, label: 'Regras', icon: <BookOpen className='w-4 h-4 mr-2' /> },
]

const adminNavigation = [
    // { link: '/admin/players', label: 'Cadastrar Jogadores', icon: <BookOpen className='w-4 h-4 mr-2' /> },
    { link: '/admin/tournaments', label: 'Organizar Torneio', icon: <CalendarDays className='w-4 h-4 mr-2' /> },
    { link: '/admin/users/management', label: 'Gerenciar usuário', icon: <UserCog className='w-4 h-4 mr-2' /> },
    // { link: '/users/register', label: 'Registrar usuário', icon: <UserCog className='w-4 h-4 mr-2' /> },
    { link: '/admin/finance', label: 'Financeiro', icon: <CircleDollarSign className='w-4 h-4 mr-2' /> },
    { link: '/admin/settings', label: 'Configurações', icon: <Settings className='w-4 h-4 mr-2' /> }
];

function Navbar() {
    const { signed, isAdmin } = useAuthContext();

    return (
        <>
            <aside className="w-60 space-y-6 hidden lg:block">
                <nav className="p-4 ">
                    {/* Desktop menu */}
                    <ul className="flex flex-col gap-6">
                        {navigation.map(item => (
                            <li key={item.label}>
                                <Link href={item.link}>
                                    <Button variant="link">
                                        {item.icon}
                                        {item.label}
                                    </Button>
                                </Link>
                            </li>
                        ))}

                        {/* Admin menu */}
                        {signed && isAdmin && (
                            <>
                                <Separator />
                                <h2 className='font-bold text-base flex justify-center'>ADMIN PANEL</h2>
                                <Separator />
                                {adminNavigation.map(item => {
                                    if (item.link === '/admin/finance') {
                                        return (
                                            <li key={item.label} className='pl-4'>
                                                <FinanceNavigation />
                                            </li>
                                        )
                                    }

                                    return (
                                        <li key={item.label}>
                                            <Link href={item.link}>
                                                <Button variant="link">
                                                    {item.icon}
                                                    {item.label}
                                                </Button>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </>
                        )}
                    </ul>
                </nav>
            </aside>
        </>
    )
}

export default Navbar;
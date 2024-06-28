"use client"

import { useState } from "react";
import { Home, Trophy, Medal, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { Button } from "@repo/ui/components/ui/button";
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { URL } from "@/lib/constants";

const navigation = [
    { link: URL.dashboard, label: 'Home', icon: <Home className='w-4 h-4 mr-2' /> },
    { link: URL.ranking, label: 'Ranking', icon: <Medal className='w-4 h-4 mr-2' /> },
    { link: URL.tournaments, label: 'Torneios', icon: <Trophy className='w-4 h-4 mr-2' /> },
    { link: URL.players, label: 'Jogadores', icon: <Users className='w-4 h-4 mr-2' /> },
    { link: URL.rules, label: 'Regras', icon: <BookOpen className='w-4 h-4 mr-2' /> },
]

const navbarMobile = cva(
    "fixed w-full h-screen top-0 left-0 bg-white z-50 flex flex-col justify-evenly items-center")

function NavbarMobile() {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const handleClick = () =>{
        setIsNavOpen((prev) => !prev)
    }

    return (
        <section className="flex lg:hidden cursor-pointer pr-5">
            <div
                className="space-y-2"
                onClick={() => setIsNavOpen((prev) => !prev)} 
            >
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
                <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            </div>

            <div className={isNavOpen ? cn(navbarMobile()) : 'hidden'}>
                <div
                    className="absolute top-0 right-0 px-8 py-8"
                    onClick={() => setIsNavOpen(false)} 
                >
                    <svg
                        className="h-8 w-8 text-gray-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
                <ul className="flex flex-col items-center justify-between min-h-[250px]">
                    {navigation.map(item => (
                        <li key={item.label} className=" my-8 uppercase">
                            <Link href={item.link}>
                                <Button variant="link" onClick={() => handleClick()}>
                                    {item.icon}
                                    {item.label}
                                </Button>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default NavbarMobile;
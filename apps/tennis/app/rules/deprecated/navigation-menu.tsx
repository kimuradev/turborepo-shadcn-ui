"use client"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@repo/ui/components/ui/navigation-menu"

import { Link } from 'react-scroll';

type Anchors = {
    href: string,
    label: string
}

type NavigationMenu = {
    anchors: Anchors[]
}

export default function NavigationMenuRules({ anchors }: NavigationMenu) {
    return (
        <NavigationMenu className="hidden lg:block" >
            <NavigationMenuList>
                {anchors.map(a => (
                    <NavigationMenuItem key={a.label}>
                        <Link to={a.href} spy smooth offset={-100} duration={500} activeClass="active" className='cursor-pointer'>
                            <span className={`${navigationMenuTriggerStyle()} hover:bg-orange-400 hover:text-white`}>
                                {a.label}
                            </span>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

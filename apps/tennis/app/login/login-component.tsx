"use client"

import { UserCircle2 } from 'lucide-react';

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"

import LoginForm from './login-form';
import { useAuthContext } from '../context/auth-context';
import { userLogout } from '@/lib/actions';
import { useState } from 'react';
import { Profile } from './profile';

export default function Login() {
    const [isOpen, setIsOpen] = useState(false);

    const handleCancel = () => {
        setIsOpen(false)
    }

    const { signed, logout } = useAuthContext();

    const handleLogout = async () => {
        await userLogout();
        logout();
    }

    if (signed) {
        return (
            <Profile handleLogout={handleLogout} />
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleCancel}>
            <Button variant="ghost" onClick={() => setIsOpen(true)}>
                <UserCircle2 className='w-4 h-4 mr-2' />
                Login
            </Button>
            <DialogContent className="sm:max-w-[425px]">
                <LoginForm handleCancel={handleCancel} />
            </DialogContent>
        </Dialog>
    )
}

"use client"

import { useState } from 'react';
import { UserCircle2 } from 'lucide-react';

import { Button } from "@repo/ui/components/ui/button"
import {
    Dialog,
    DialogContent,
} from "@repo/ui/components/ui/dialog"
import { userLogout } from '@/lib/actions';

import LoginForm from './login-form';
import { Profile } from './profile';
import { useAuthContext } from '../context/auth-context';

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

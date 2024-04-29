'use client'

import { Save } from 'lucide-react';
import { Button } from '@repo/ui/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';

export default function FloatSaveButton() {
    const { pending } = useFormStatus()

    return (
        <div className='fixed bottom-8 right-8'>
            <Button variant="outline" size="icon" className='rounded-full bg-orange-300 w-12 h-12' >
                {!pending ? <Save className="h-8 w-8" type="submit" /> : <ReloadIcon className="h-6 w-6 animate-spin" />}
            </Button>
        </div>
    )
}
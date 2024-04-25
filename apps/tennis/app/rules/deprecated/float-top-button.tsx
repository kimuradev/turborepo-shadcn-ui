"use client"

import { animateScroll as scroll } from 'react-scroll';
import { ArrowBigUpDash } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FloatTopButton() {
    return (
        <div className='fixed bottom-8 right-8'>
            <Button variant="outline" size="icon" className='rounded-full bg-orange-300' onClick={scroll.scrollToTop}>
                <ArrowBigUpDash className="h-8 w-8" />
            </Button>
        </div>
    )
}
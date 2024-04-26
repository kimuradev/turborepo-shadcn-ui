import { Suspense } from 'react';
import Spinner from "@repo/ui/components/ui/spinner";
import Tiptap from './tiptap';
import { getApi } from '@/lib/fetch';

export default async function Page() {
    const response = await getApi('/rules', { cache: 'no-store' });

    return (
        <div className='relative'>
            <div className='flex justify-between items-start '>
                <h2 className="font-bold text-lg mt-1 mb-10">Regras</h2>
            </div>

            <Suspense fallback={<Spinner />}>
                <Tiptap data={response?.content} />
            </Suspense>
        </div>
    )

}

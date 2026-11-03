import React, { Suspense } from 'react';
import Banner from './Banner';
import { cn } from "cn"
import { LoaderIcon } from "lucide-react"
import { Spinner } from '@/components/ui/spinner';

const BannerSuspense = () => {
    return (
        <Suspense 
        fallback={
            <div className="flex items-center gap-4">
                <Spinner className='mx-auto' />
            </div>
        }>
            <Banner />
        </Suspense>
    );
};

export default BannerSuspense;
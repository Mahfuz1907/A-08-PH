import React, { Suspense } from 'react';
import StudioPage from './StudioPage';
import { Spinner } from '@/components/ui/spinner';

const StudioSuspense = () => {
    return (
        <Suspense fallback={
        <div className="flex items-center gap-4">
            <Spinner className='mx-auto my-20' />
        </div>
        }>
            <StudioPage />
        </Suspense>
    );
};

export default StudioSuspense;
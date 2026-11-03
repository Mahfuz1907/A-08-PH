import React, { Suspense } from 'react';
import FeaturedStudios from './FeaturedStudios';
import { Spinner } from '@/components/ui/spinner';

const FeatureSuspense = () => {
    return (
        <Suspense 
        fallback={
        <div className="flex items-center gap-4">
            <Spinner className='mx-auto' />
        </div>
        }>
            <FeaturedStudios />
        </Suspense>
    );
};

export default FeatureSuspense;
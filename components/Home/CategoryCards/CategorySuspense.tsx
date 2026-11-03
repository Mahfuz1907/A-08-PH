import React, { Suspense } from 'react';
import CategoryCards from './CategoryCards';
import { Spinner } from '@/components/ui/spinner';

const CategorySuspense = () => {
    return (
        <Suspense 
        fallback={
        <div className="flex items-center gap-4">
            <Spinner className='mx-auto' />
        </div>
        }>
            <CategoryCards />
        </Suspense>
    );
};

export default CategorySuspense;
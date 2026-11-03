import React, { Suspense } from 'react';
import StudioPage from './StudioPage';
import { Spinner } from '@/components/ui/spinner';


const StudiosPage = () => {
    return (
        <Suspense 
        fallback={
        <div className="flex items-center gap-4">
            <Spinner className='mx-auto' />
        </div>
        }>
            <StudioPage />
        </Suspense>
    );
};

export default StudiosPage;
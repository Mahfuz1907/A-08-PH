import { Spinner } from '@/components/ui/spinner';
import React, { Suspense } from 'react';
import BookingsPage from './BookingsPage';

const MyBookingsSuspense = () => {
    return (
        <Suspense fallback={
          <div className="flex items-center gap-4">
            <Spinner className='mx-auto my-20' />
          </div>
        }>
            <BookingsPage />
        </Suspense>
    );
};

export default MyBookingsSuspense;
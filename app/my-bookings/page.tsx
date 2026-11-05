import { Spinner } from '@/components/ui/spinner';
import React, { Suspense } from 'react';
import BookingsPage from './BookingsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "My Bookings | Studio Space",
  description: "A modern studio space for creative professionals",
  icons:{
    icon: '/icon.png'
  }
};

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
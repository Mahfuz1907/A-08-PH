import React, { Suspense } from 'react';
import MyListingsPage from './MyListingsPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "My Studio Listings | Studio Space",
  description: "A modern studio space for creative professionals",
  icons:{
    icon: '/icon.png'
  }
};

const MyListingSuspense = () => {
    return (
        <Suspense>
            <MyListingsPage />
        </Suspense>
    );
};

export default MyListingSuspense;
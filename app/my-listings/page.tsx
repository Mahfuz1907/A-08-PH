import React, { Suspense } from 'react';
import MyListingsPage from './MyListingsPage';

const MyListingSuspense = () => {
    return (
        <Suspense>
            <MyListingsPage />
        </Suspense>
    );
};

export default MyListingSuspense;
import React, { Suspense } from 'react';
import FooterCats from './FooterCats';
import { Spinner } from '../ui/spinner';

const FooterSuspense = () => {
    return (
        <Suspense
        fallback={
          <div className="flex items-center gap-4">
            <Spinner className="mx-auto" />
          </div>
        }>
            <FooterCats />
        </Suspense>
    );
};

export default FooterSuspense;
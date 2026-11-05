import { Spinner } from '@/components/ui/spinner';
import React from 'react';

const Loader = () => {
    return (
        <div>
            <div className="flex items-center gap-4">
                <Spinner className='mx-auto my-20 text-sky-500 size-8' />
          </div>
        </div>
    );
};

export default Loader;
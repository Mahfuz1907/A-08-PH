import React from 'react';
import AddForm from './AddForm';

const AddAfterSuspense = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`)
    const categories = await res.json()
    return (
        <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6">
          <AddForm categories={categories} />
        </div>
    );
};

export default AddAfterSuspense;
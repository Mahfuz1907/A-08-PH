import React from 'react';
import BookingCard from './BookingCard';
import { Bookings } from '@/lib/type';

const BookingsPage = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings`)
    const bookings = await res.json()
    return (
        <div className="max-w-6xl mx-auto px-4 py-8 text-foreground">
    <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold">My Bookings</h1>
            <p className="text-sm text-muted-foreground">Manage your studio reservations and track status</p>
        </div>
    </div>

    {bookings.length === 0 ? (
        <div className="text-center py-20 bg-muted/50 rounded-lg border border-border">
            <p className="text-muted-foreground">No bookings found.</p>
        </div>
    ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking: Bookings) => (
                <BookingCard 
                    key={booking._id} 
                    booking={booking} 
                />
            ))}
        </div>
    )}
</div>
    );
};

export default BookingsPage;
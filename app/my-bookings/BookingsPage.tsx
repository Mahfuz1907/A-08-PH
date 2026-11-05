import React from 'react';
import BookingCard from './BookingCard';
import { Bookings } from '@/lib/type';
import { CalendarX } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-muted/30 rounded-2xl border border-border text-center">
            <div className="bg-muted/50 p-4 rounded-full text-sky-500 mb-4">
                <CalendarX className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">No Bookings Found</h3>
            <p className="text-muted-foreground text-sm max-w-sm mt-1 mb-6">
                You haven&apos;t booked any studio slots yet. Browse available studios to make your first booking!
            </p>
            <Link href="/studios">
                <Button className="bg-sky-600 hover:bg-sky-500 text-white">
                Explore Studios
                </Button>
            </Link>
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
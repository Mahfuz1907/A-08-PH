'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Layers, Mic2 } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

interface StatsCardsProps {
    email?: string;
}

interface BookingCardProps {
    _id: string;
    studioTitle: string;
    bookingDate: string;
    startTime: string;
    endTime: string;
    ["hourly-rate"]: number;
    status: string;
}

export default function StatsCards({ email }: StatsCardsProps) {
    const [stats, setStats] = useState({ totalBookings: 0, totalListings: 0, pendingBookings: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!email) return;

        async function fetchStats() {
            try {
                const [resBookings, resListings] = await Promise.all([
                    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/user/${email}`),
                    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios/email/${email}`)
                ]);

                const bookings = await resBookings.json();
                const listings = await resListings.json();

                // Correct pending bookings calculation using filter
                const pendingCount = Array.isArray(bookings) 
                    ? bookings.filter((b: BookingCardProps) => b.status === 'Pending').length 
                    : 0;

                setStats({
                    totalBookings: Array.isArray(bookings) ? bookings.length : 0,
                    totalListings: Array.isArray(listings) ? listings.length : 0,
                    pendingBookings: pendingCount
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, [email]);

    if (loading) {
        return (
            <div className="flex items-center gap-4">
                <Spinner className='mx-auto' />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-card border-border text-card-foreground">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">My Bookings</CardTitle>
                    <Calendar className="w-4 h-4 text-sky-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalBookings}</div>
                    <p className="text-xs text-muted-foreground mt-1">Active & past reservations</p>
                </CardContent>
            </Card>

            <Card className="bg-card border-border text-card-foreground">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">My Studio Listings</CardTitle>
                    <Layers className="w-4 h-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.totalListings}</div>
                    <p className="text-xs text-muted-foreground mt-1">Studios managed by you</p>
                </CardContent>
            </Card>

            <Card className="bg-card border-border text-card-foreground">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
                    <Mic2 className="w-4 h-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.pendingBookings}</div>
                    <p className="text-xs text-muted-golden mt-1">Awaiting confirmation</p>
                </CardContent>
            </Card>
        </div>
    );
}
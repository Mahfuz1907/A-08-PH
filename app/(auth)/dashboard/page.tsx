'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowRight } from 'lucide-react';
import { useSession } from '@/app/lib/auth-client';
import StatsCards from './StatsCards';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Spinner } from '@/components/ui/spinner';

const DashboardPage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    const userRole = 'Studio Member';

    const getInitials = (name: string) => {
        return name
        ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
        : "U"
    }

    if (isPending) {
        return (
            <div className="flex items-center gap-4">
                <Spinner className='mx-auto' />
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Welcome back, {user?.name || "User"}! Here is the summary of your studio activities.
                </p>
            </div>

            {/* Profile Summary Card */}
            <Card className="bg-card border-border text-card-foreground shadow-sm">
                <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="size-9 border border-border">
                  <AvatarImage src={user?.image || 'https://image.png'} alt={user?.name} />
                  <AvatarFallback className="bg-sky-600 text-white font-semibold">
                    {getInitials(user?.name || 'User')}
                  </AvatarFallback>
                </Avatar>
                    <div>
                        <CardTitle className="text-xl">{user?.name || "Studio User"}</CardTitle>
                        <CardDescription className="text-muted-foreground">{user?.email}</CardDescription>
                        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-500/10 text-sky-500 border border-sky-500/20">
                            {userRole}
                        </span>
                    </div>
                </CardHeader>
            </Card>

            {/* Quick Stats Grid */}
            <StatsCards user={user} />

            {/* Quick Navigation Action Cards */}
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-card border-border hover:border-sky-500/50 transition-colors flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-base">View Bookings</CardTitle>
                            <CardDescription className="text-sm">Manage your upcoming studio time slots and cancel pending ones.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/my-bookings">
                                <Button variant="outline" className="w-full justify-between">
                                    Go to My Bookings
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border hover:border-sky-500/50 transition-colors flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-base">Studio Listings</CardTitle>
                            <CardDescription className="text-sm">Check and manage all the studio spaces you have published.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/my-listings">
                                <Button variant="outline" className="w-full justify-between">
                                    View Listings
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border hover:border-sky-500/50 transition-colors flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-base">Add New Studio</CardTitle>
                            <CardDescription className="text-sm">List a new recording booth or creative workspace for others.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/add-studio">
                                <Button className="w-full justify-between bg-sky-600 hover:bg-sky-500 text-white">    
                                    Create Listing
                                    <PlusCircle className="w-4 h-4 ml-2" />    
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
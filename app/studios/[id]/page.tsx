import React, { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { ArrowLeft, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import BookingDialogueBox from './BookingDialogueBox';
import { notFound } from 'next/navigation';

interface StudioDetailsProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata ({params}:StudioDetailsProps) {
    const {id} = await params
    if(!id){
        return {
            title: "Invalid Url | Studio Space",
            description: "A modern studio space for creative professionals",
            icons:{
                icon: '/icon.png'
            }
        }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios/${id}`)

    if (!res.ok) {
        return {
            title: "Invalid Url | Studio Space",
            description: "A modern studio space for creative professionals",
            icons:{
                icon: '/icon.png'
            }
        }
    }

    const studio = await res.json()
    
    if (!studio) {
        return {
            title: "Invalid Url | Studio Space",
            description: "A modern studio space for creative professionals",
            icons:{
                icon: '/icon.png'
            }
        }
    }

    return {
        title: `${studio.title} | Studio Space`,
        description: "A modern studio space for creative professionals",
        icons:{
            icon: '/icon.png'
        }
    }
};

const StudioContent = async({params}:StudioDetailsProps) => {
    const {id} = await params

    if(!id){
        notFound()
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios/${id}`)

    if (!res.ok) {
        notFound();
    }

    const studio = await res.json()
    
    if (!studio) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-foreground">
            {/* Back to Studios Link */}
            <div className="mb-6">
                <Link 
                    href="/studios" 
                    className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Explore Studios
                </Link>
            </div>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30">
                        {studio.category}
                    </span>
                    <h1 className="text-3xl text-foreground lg:text-4xl font-extrabold tracking-tight mt-2">{studio.title}</h1>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                        <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400" /> {studio.location}
                    </p>
                </div>
            </div>

            {/* Gallery / Image & specificaitons Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                <div className="lg:col-span-2 relative h-87.5 sm:h-112.5 rounded-3xl overflow-hidden bg-card border border-border">
                    <Image 
                        src={studio.imageUrl || ''} 
                        alt={studio.title || ''} 
                        fill 
                        className="object-cover"
                    />
                </div>
                <div className="bg-card border border-border rounded-3xl p-6 flex flex-col justify-between space-y-4">
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-foreground">Quick Specifications</h3>
                        <ul className="space-y-3 text-sm text-foreground/80">
                            <li className="flex justify-between border-b border-border pb-2">
                                <span className="text-muted-foreground">Max Capacity:</span>
                                <span className="font-semibold">{studio.maxCapacity || 'N/A'} Persons</span>
                            </li>
                            <li className="flex justify-between border-b border-border pb-2">
                                <span className="text-muted-foreground">Security Deposit:</span>
                                <span className="font-semibold">${studio.securityDeposit || 0}</span>
                            </li>
                            <li className="flex justify-between border-b border-border pb-2">
                                <span className="text-muted-foreground">Rating:</span>
                                <span className="font-semibold text-amber-600 dark:text-amber-400">⭐ 4.8 (Reviews)</span>
                            </li>
                        </ul>
                    </div>
                    <div className="pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-1">Hosted by</p>
                        <p className="font-semibold text-foreground">{studio.hostName || 'Mahfuz Tamim'}</p>
                        <p className="text-xs text-muted-foreground/70">{studio.hostEmail || 'mahfuztamim1907@gmail.com'}</p>
                    </div>
                </div>
            </div>

            {/* Details, Amenities, review & booking card sidebar secitons */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-card border border-border rounded-3xl p-8">
                        <h2 className="text-xl font-bold mb-4 text-foreground">Detailed Overview</h2>
                        <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">
                            {studio.description}
                        </p>
                    </div>

                    <div className="bg-card border border-border rounded-3xl p-8">
                        <h2 className="text-xl font-bold mb-4 text-foreground">Amenities & Equipment</h2>
                        <div className="flex flex-wrap gap-2">
                            {studio.amenities ? (
                                studio.amenities.split(',').map((amenity: string, idx: number) => (
                                    <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-medium bg-muted text-sky-700 dark:text-sky-300 border border-border">
                                        ✓ {amenity.trim()}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-muted-foreground/70">No amenities listed</span>
                            )}
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-card border border-border rounded-3xl p-8">
                        <h2 className="text-xl font-bold mb-4 text-foreground">Client Reviews</h2>
                        <div className="space-y-4">
                            <div className="border-b border-border pb-4">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold text-sm text-foreground">Alex Morgan</span>
                                    <span className="text-xs text-amber-600 dark:text-amber-400">⭐⭐⭐⭐⭐</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Amazing space! The lighting setup and acoustic treatment made our project super smooth.</p>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold text-sm text-foreground">Sarah Jenkins</span>
                                    <span className="text-xs text-amber-600 dark:text-amber-400">⭐⭐⭐⭐⭐</span>
                                </div>
                                <p className="text-xs text-muted-foreground">Very professional host and clean environment. Highly recommended for creators!</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Card Sidebar */}
                <div>
                    <div className="bg-card border border-border rounded-3xl p-6 sticky top-24 space-y-6">
                        <h3 className="text-lg font-bold text-foreground">Reserve Space</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between text-foreground/80">
                                <span>Hourly Rate</span>
                                <span className="font-bold text-foreground">${studio["hourly-rate"]}/hr</span>
                            </div>
                            <div className="flex justify-between text-foreground/80">
                                <span>Security Deposit</span>
                                <span className="font-bold text-foreground">${studio.securityDeposit}</span>
                            </div>
                            <div className="border-t border-border pt-3 flex justify-between text-base font-bold text-sky-600 dark:text-sky-400">
                                <span>Total Due at Booking</span>
                                <span>${(studio["hourly-rate"] * 2) + studio.securityDeposit} (Est. 2 hrs)</span>
                            </div>
                        </div>
                        <BookingDialogueBox studio={studio} />
                    </div>
                </div>
            </div>
        </div>
    );
};


const Page = ({params}:StudioDetailsProps) => {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
                <Spinner className='mx-auto my-20' />
            </div>
        }>
            <StudioContent params={params} />
        </Suspense>
    )
}

export default Page;
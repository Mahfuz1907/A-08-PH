import React, { Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface StudioDetailsProps {
    params: Promise<{ id: string }>;
}

const StudioContent = async({params}:StudioDetailsProps) => {
    const {id} = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios/${id}`)
    const studio = await res.json()
    console.log(studio)
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
            {/* Back to Studios Link */}
            <div className="mb-6">
                <Link 
                    href="/studios" 
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-sky-400 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Explore Studios
                </Link>
            </div>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30">
                        {studio.category}
                    </span>
                    <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight mt-2">{studio.title}</h1>
                    <p className="text-sm text-slate-400 flex items-center gap-1.5 mt-1">
                        <MapPin className="w-4 h-4 text-sky-400" /> {studio.location}
                    </p>
                </div>
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-6">
                    <div>
                        <span className="text-xs text-slate-400 block">Hourly Rate</span>
                        <span className="text-2xl font-black text-sky-400">${studio["hourly-rate"]}<span className="text-xs font-normal text-slate-400">/hr</span></span>
                    </div>
                    <Button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-sky-600/20">
                        Book Workspace Now
                    </Button>
                </div>
            </div>

            {/* Gallery / Image & specificaitons Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                <div className="lg:col-span-2 relative h-87.5 sm:h-112.5 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800">
                    <Image 
                        src={studio.imageUrl || ''} 
                        alt={studio.title || ''} 
                        fill 
                        className="object-cover"
                    />
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4">
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-white">Quick Specifications</h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li className="flex justify-between border-b border-slate-800 pb-2">
                                <span className="text-slate-400">Max Capacity:</span>
                                <span className="font-semibold">{studio.maxCapacity || 'N/A'} Persons</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-800 pb-2">
                                <span className="text-slate-400">Security Deposit:</span>
                                <span className="font-semibold">${studio.securityDeposit || 0}</span>
                            </li>
                            <li className="flex justify-between border-b border-slate-800 pb-2">
                                <span className="text-slate-400">Rating:</span>
                                <span className="font-semibold text-amber-400">⭐ 4.8 (Reviews)</span>
                            </li>
                        </ul>
                    </div>
                    <div className="pt-4 border-t border-slate-800">
                        <p className="text-xs text-slate-400 mb-1">Hosted by</p>
                        <p className="font-semibold text-white">{studio.hostName || 'Mahfuz Tamim'}</p>
                        <p className="text-xs text-slate-500">{studio.hostEmail || 'mahfuztamim1907@gmail.com'}</p>
                    </div>
                </div>
            </div>

            {/* Details, Amenities, review & booking card sidebar secitons */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                        <h2 className="text-xl font-bold mb-4 text-white">Detailed Overview</h2>
                        <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                            {studio.description}
                        </p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                        <h2 className="text-xl font-bold mb-4 text-white">Amenities & Equipment</h2>
                        <div className="flex flex-wrap gap-2">
                            {studio.amenities ? (
                                studio.amenities.split(',').map((amenity: string, idx: number) => (
                                    <span key={idx} className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-800 text-sky-300 border border-slate-700">
                                        ✓ {amenity.trim()}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-slate-500">No amenities listed</span>
                            )}
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">
                        <h2 className="text-xl font-bold mb-4 text-white">Client Reviews</h2>
                        <div className="space-y-4">
                            <div className="border-b border-slate-800 pb-4">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold text-sm text-white">Alex Morgan</span>
                                    <span className="text-xs text-amber-400">⭐⭐⭐⭐⭐</span>
                                </div>
                                <p className="text-xs text-slate-400">Amazing space! The lighting setup and acoustic treatment made our project super smooth.</p>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-semibold text-sm text-white">Sarah Jenkins</span>
                                    <span className="text-xs text-amber-400">⭐⭐⭐⭐⭐</span>
                                </div>
                                <p className="text-xs text-slate-400">Very professional host and clean environment. Highly recommended for creators!</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Card Sidebar */}
                <div>
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sticky top-24 space-y-6">
                        <h3 className="text-lg font-bold text-white">Reserve Space</h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between text-slate-300">
                                <span>Hourly Rate</span>
                                <span className="font-bold text-white">${studio["hourly-rate"]}/hr</span>
                            </div>
                            <div className="flex justify-between text-slate-300">
                                <span>Security Deposit</span>
                                <span className="font-bold text-white">${studio.securityDeposit}</span>
                            </div>
                            <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-bold text-sky-400">
                                <span>Total Due at Booking</span>
                                <span>${(studio["hourly-rate"] * 2) + studio.securityDeposit} (Est. 2 hrs)</span>
                            </div>
                        </div>
                        <Button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-sky-600/30">
                            Book Workspace Now
                        </Button>
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
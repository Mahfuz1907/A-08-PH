import { auth } from '@/auth';
import { Layers } from 'lucide-react';
import { headers } from 'next/headers';
import ListCard from './ListCard';

interface Studio {
  _id: string;
  title: string;
  category: string;
  "hourly-rate": number;
  securityDeposit: number;
  maxCapacity: number;
  amenities: string;
  location: string;
  imageUrl: string;
  description: string;
}

const MyListingsPage = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const userEmail = session?.user?.email
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios/email/${userEmail}`)
    const studios = await res.json()
    
    return (
        <div className="min-h-screen bg-slate-950 text-white py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
                            My Studio Listings
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Manage and view all the creative spaces you have published.
                        </p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg text-sm text-slate-300">
                        Total Listings: <span className="font-bold text-indigo-400">{studios?.length || 0}</span>
                    </div>
                </div>

                {/* Content / Grid or Empty State */}
                {studios && studios.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {studios.map((studio: Studio) => (
                            <ListCard key={studio._id} studio={studio} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-slate-900/30 rounded-2xl border border-slate-800/80 text-center px-4">
                        <div className="bg-slate-800/50 p-4 rounded-full text-indigo-400 mb-4">
                            <Layers className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-200">No Listings Found</h3>
                        <p className="text-slate-400 text-sm max-w-sm mt-1">
                            You haven&apos;t added any studio spaces yet. Go to the add studio page to create your first listing!
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default MyListingsPage;
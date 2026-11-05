import { auth } from '@/auth';
import { Layers, PlusCircle } from 'lucide-react';
import { headers } from 'next/headers';
import ListCard from './ListCard';
import { Studio } from '@/lib/type';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


const MyListingsPage = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const userEmail = session?.user?.email
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios/email/${userEmail}`)
    const studios = await res.json()
    
    return (
        <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                
                {/* Page Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-indigo-600 dark:from-indigo-400 to-pink-500 bg-clip-text text-transparent">
                            My Studio Listings
                        </h1>
                        <p className="text-muted-foreground text-sm mt-1">
                            Manage and view all the creative spaces you have published.
                        </p>
                    </div>
                    <div className="bg-card border border-border px-4 py-2 rounded-lg text-sm text-foreground/80">
                        Total Listings: <span className="font-bold text-indigo-600 dark:text-indigo-400">{studios?.length || 0}</span>
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
                    <div className="flex flex-col items-center justify-center py-16 px-4 bg-muted/30 rounded-2xl border border-border text-center">
                        <div className="bg-muted/50 p-4 rounded-full text-indigo-500 mb-4">
                            <Layers className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-semibold text-foreground">No Listings Found</h3>
                        <p className="text-muted-foreground text-sm max-w-sm mt-1 mb-6">
                            You haven&apos;t added any studio spaces yet. Create your first listing to start accepting bookings!
                        </p>
                        <Link href="/add-studio">
                            <Button className="bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-2">
                            <PlusCircle className="w-4 h-4" />
                                Create New Studio
                            </Button>
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
};

export default MyListingsPage;
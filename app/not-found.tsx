import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Mic2, AlertCircle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Invalid Url | Studio Space",
  description: "A modern studio space for creative professionals",
  icons:{
    icon: '/icon.png'
  }
};

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 text-center">
            {/* Creative Studio 404 Illustration Icon Box */}
            <div className="relative mb-8">
                <div className="w-24 h-24 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500 mx-auto animate-pulse">
                    <Mic2 className="w-12 h-12" />
                </div>
                <div className="absolute -top-2 -right-2 bg-rose-500/10 border border-rose-500/20 text-rose-500 p-2 rounded-full">
                    <AlertCircle className="w-5 h-5" />
                </div>
            </div>

            {/* Error Code & Title */}
            <span className="text-sm font-semibold tracking-widest uppercase text-sky-500 mb-2">
                404 Error
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                Studio Space Not Found
            </h1>
            
            {/* Description */}
            <p className="max-w-md text-muted-foreground text-sm md:text-base mb-8">
                Looks like this recording booth or creative workspace has been moved, deleted, or never existed in our frequency.
            </p>

            {/* Return to Home Action Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                    <Button className="bg-sky-600 hover:bg-sky-500 text-white font-medium px-6 py-2.5">
                        <Home className="w-4 h-4 mr-2" />
                        Return to Home                   
                    </Button>
                </Link>
            </div>
        </div>
    );
}
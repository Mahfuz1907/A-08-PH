import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Studio {
  _id?: string;
  title: string;
  category: string;
  "hourly-rate": number;
  location: string;
  imageUrl: string;
  description: string;
}

const FeatureCard = ({studio}:{studio:Studio}) => {
    return (
        <Card key={studio._id} className="bg-slate-900 border-slate-800 text-white overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                            <Image 
                                src={studio.imageUrl || ''} 
                                alt={studio.title || ''}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30 backdrop-blur-md z-10">
                                {studio.category}
                            </span>
                        </div>
                <CardHeader className="p-5 pb-2">
                  <h3 className="text-lg font-bold tracking-tight text-white line-clamp-1">
                    {studio.title}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span className="truncate">{studio.location}</span>
                  </p>
                </CardHeader>
              </div>
              <CardFooter className="p-5 pt-4 flex items-center justify-between border-t border-slate-800/60 mt-4">
                <div>
                  <span className="text-xs text-slate-400 block">Hourly Rate</span>
                  <span className="text-lg font-extrabold text-sky-400">
                    ${studio["hourly-rate"]}<span className="text-xs font-normal text-slate-400">/hr</span>
                  </span>
                </div>
                <Button size="sm" className="bg-sky-600 hover:bg-sky-700 text-white">
                  <Link href="/studios">
                    Book Now
                  </Link>
                </Button>
              </CardFooter>
            </Card>
    );
};

export default FeatureCard;
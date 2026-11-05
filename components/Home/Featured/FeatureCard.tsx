import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Studio } from '@/lib/type';
import { ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const FeatureCard = ({studio}:{studio:Studio}) => {
    return (
       <Card className="bg-card border-border text-foreground overflow-hidden hover:border-foreground/25 transition-all duration-300 flex flex-col justify-between group">
             <div>
               <div className="relative h-48 w-full overflow-hidden bg-background">
                   <Image 
                       src={studio.imageUrl || ''} 
                       alt={studio.title || ''}
                       fill
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                       className="object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                   <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 backdrop-blur-md z-10">
                       {studio.category}
                   </span>
                   {/* Demo Rating Badge */}
                   <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-background/80 text-amber-600 dark:text-amber-400 border border-amber-500/30 backdrop-blur-md z-10 flex items-center gap-1">
                       ⭐ {studio.rating}
                   </span>
               </div>
               <CardHeader className="p-5 pb-2">
                 <h3 className="text-lg font-bold tracking-tight text-foreground line-clamp-1">
                   {studio.title}
                 </h3>
                 <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                   <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                   <span className="truncate">{studio.location}</span>
                 </p>
               </CardHeader>
               <CardContent className="p-5 pt-2">
                 <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                   {studio.description}
                 </p>
               </CardContent>
             </div>
             <CardFooter className="p-5 pt-2 flex items-center justify-between border-t border-border/60 mt-4">
               <div>
                 <span className="text-xs text-muted-foreground block">Hourly Rate</span>
                 <span className="text-lg font-black text-sky-600 dark:text-sky-400">
                   ${studio["hourly-rate"]}<span className="text-xs font-normal text-muted-foreground">/hr</span>
                 </span>
               </div>
               <Link href={`/studios/${studio._id || ''}`}>
                 <Button size="sm" className="bg-sky-600 hover:bg-sky-700 cursor-pointer text-white flex flex-row justify-center items-center">
                   View Details <ArrowRight className="w-4 h-4 ml-1" />
                 </Button>
               </Link>
             </CardFooter>
           </Card>
    );
};

export default FeatureCard;
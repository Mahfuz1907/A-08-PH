import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Mic, Music, Palette, Film, ArrowRight, LucideIcon } from "lucide-react";

interface Category{
    _id: string,
    title: string, 
    slug: string,
    description: string,
    icon: string, 
    count: string,
    imageUrl: string
}

const iconMap: { [key: string]: LucideIcon } = {
  Camera: Camera,
  Film: Film,
  Mic: Mic,
  Music: Music,
  Palette: Palette,
};

const CardsDesign = ({cat}:{cat:Category}) => {
    const IconComponent = iconMap[cat.icon] || Camera;
    return (
        <div>
        <Link 
            href={`/studios?category=${encodeURIComponent(cat.slug)}`}
            className="group block"
        >
        <Card className="bg-slate-900 border-slate-800 text-white overflow-hidden hover:border-sky-500/50 transition-all duration-300 relative h-64 flex flex-col justify-end p-6">
                  
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 z-0">
                <Image 
                    src={cat.imageUrl} 
                    alt={cat.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40 group-hover:opacity-50"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/70 to-transparent" />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/70 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center backdrop-blur-md mb-3 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                <IconComponent className="w-5 h-5" /> 
            </div>
                    
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors">
                {cat.title}
                </h3>
                <span className="text-xs font-medium text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-full">
                {cat.count}
                </span>
            </div>

            <p className="text-xs text-slate-300 line-clamp-2">
                {cat.description}
            </p>

            <div className="flex items-center gap-1 text-xs font-semibold text-sky-400 pt-1 group-hover:translate-x-1 transition-transform">
                <span>Explore spaces</span>
                <ArrowRight className="w-3.5 h-3.5" />
            </div>
            </div>

        </Card>
        </Link>
        </div>
    );
};

export default CardsDesign;
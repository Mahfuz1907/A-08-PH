import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeatureCard from "./FeatureCard";

interface Studio {
  _id?: string;
  title: string;
  category: string;
  "hourly-rate": number;
  location: string;
  imageUrl: string;
  description: string;
}


const FeaturedStudios = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/featured-studios`)
    const featured = await res.json()

    return (
        <section className="py-16 md:py-24 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 inline-block mb-3">
              Handpicked Spaces
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Featured Creative Studios
            </h2>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 border-slate-800 bg-slate-900 text-white hover:bg-slate-800 hover:text-white">
            <Link href="/studios" className="flex flex-row justify-center items-center">
              View All Studios <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Responsive Grid with Shadcn Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((studio:Studio) => (
            <FeatureCard key={studio._id} studio={studio} />
          ))}
        </div>

      </div>
    </section>
    );
};

export default FeaturedStudios;
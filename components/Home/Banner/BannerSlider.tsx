'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

interface Studio {
  _id?: string;
  title: string;
  category: string;
  "hourly-rate": number;
  location: string;
  imageUrl: string;
  description: string;
}

const BannerSlider = ({studios}:{studios:Studio[]}) => {
    return (
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect={'fade'}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
        >
          {studios.map((studio:Studio, index:string | number) => (
            <SwiperSlide key={studio._id}>
              <div className="relative h-120 sm:h-135 lg:h-150 w-full flex items-center">
                {/* Background Image with Overlay */}
                <Image
                  src={studio.imageUrl}
                  alt={studio.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/80 to-transparent" />

                {/* Content */}
                <div className="relative z-10 max-w-2xl px-6 sm:px-12 lg:px-16 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-400 border border-sky-500/30 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{studio.category} • ${studio["hourly-rate"]}/hr</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    {studio.title}
                  </h1>

                  <p className="text-slate-300 text-sm sm:text-base line-clamp-3 max-w-xl">
                    {studio.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Button size="lg" className="bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-xl px-6">
                      <Link href="/studios" className="flex flex-row justify-center items-center">
                        Explore Studios <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    );
};

export default BannerSlider;
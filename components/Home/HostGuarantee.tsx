import React from "react";
import { ShieldCheck, UserCheck, PackageCheck, Headset } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Liability Protection",
    description: "Every studio booking includes platform insurance coverage against property or gear damage during shoots.",
    icon: ShieldCheck,
  },
  {
    title: "Verified Profiles",
    description: "All studio hosts and booking creators undergo multi-step identity verification for complete safety.",
    icon: UserCheck,
  },
  {
    title: "Equipment Safety",
    description: "On-site production gear, lights, and audio setups are cataloged and checked before check-in.",
    icon: PackageCheck,
  },
  {
    title: "24/7 Host Support",
    description: "Dedicated assistance available round the clock to resolve any scheduling or production inquiries.",
    icon: Headset,
  },
];

export default function HostGuarantee() {
  return (
    <section id="about" className="py-16 md:py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Grid Header */}
        <div className="bg-linear-to-r from-slate-900 via-slate-900/90 to-sky-950/40 border border-slate-800 rounded-3xl p-8 md:p-12 mb-12">
          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 inline-block mb-4">
              Peace of Mind
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Host Guarantee & Creator Support
            </h2>
            <p className="text-slate-400 mt-4 text-base leading-relaxed">
              We provide continuous protection, strict safety guidelines, and 24/7 direct communication channels so creators and space owners can collaborate with absolute confidence.
            </p>
          </div>
        </div>

        {/* Features 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="bg-slate-900/60 border-slate-800 hover:border-slate-700 transition-colors">
                <CardContent className="p-6 md:p-8 flex items-start space-x-5">
                  <div className="p-3.5 rounded-2xl bg-sky-500/10 text-sky-400 shrink-0">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
}
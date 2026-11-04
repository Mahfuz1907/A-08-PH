import React from "react";
import { Search, Calendar, Zap, Clapperboard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    step: "01",
    title: "Discover Spaces",
    description: "Browse verified photo studios, sound stages, podcast rooms, and creative workshops nearby.",
    icon: Search,
  },
  {
    step: "02",
    title: "Select Shoot Hours",
    description: "Pick your exact production date and hourly slots with flexible host scheduling.",
    icon: Calendar,
  },
  {
    step: "03",
    title: "Book Instantly",
    description: "Secure your reservation seamlessly with instant host confirmation and clear terms.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Create & Produce",
    description: "Step into fully equipped production spaces and bring your creative vision to life.",
    icon: Clapperboard,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-muted/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-2">
            Simple Process
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            How Booking Works
          </h3>
          <p className="text-muted-foreground mt-3 text-sm md:text-base">
            From concept to execution, stream your production workflow in just four seamless steps.
          </p>
        </div>

        {/* Workflow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="bg-background border-border hover:border-foreground/25 transition-all duration-300 relative group">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 group-hover:bg-sky-500 group-hover:text-background transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-3xl font-black text-muted-foreground/50 group-hover:text-muted-foreground transition-colors">
                        {item.step}
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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
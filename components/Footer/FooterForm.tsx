'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FooterForm = () => {
    const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add Sonner toast notification logic here if needed
    };
    return (
        <div className="space-y-4 lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Stay Updated
            </h3>
            <p className="text-sm text-slate-400">
              Subscribe to our newsletter for exclusive studio drops & creative tips.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-slate-700"
                required 
              />
              <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white">
                Subscribe
              </Button>
            </form>
          </div>
    );
};

export default FooterForm;
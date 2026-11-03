'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FooterSuspense from "./FooterSuspense";

const Footer = () => {
    const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add Sonner toast notification logic here if needed
    };

    return (
        <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Branding & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <Image 
                src="/icon.png" 
                alt="StudioSpace Logo" 
                width={36} 
                height={36} 
                className="object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                StudioSpace
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              StudioSpace is a high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians to discover and share creative production spaces.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/studios" className="hover:text-white transition-colors">
                  Explore Studios
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Categories
            </h3>
              <FooterSuspense />
          </div>

          {/* Column 4: Newsletter & Socials */}
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

        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} StudioSpace. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            {/* New X Logo (Twitter Rebrand) */}
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="X (formerly Twitter)"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Instagram Link */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
    );
};

export default Footer;
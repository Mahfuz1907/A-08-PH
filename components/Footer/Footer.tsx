import React, { Suspense } from "react";
import Link from "next/link";
import FooterCats from "./FooterCats";
import { Spinner } from "../ui/spinner";
import FooterForm from "./FooterForm";
import { Aperture } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-background text-foreground/80 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Branding & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="size-9 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-lg shadow-sky-600/30">
                <Aperture className="size-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                StudioSpace
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              StudioSpace is a high-performance peer-to-peer marketplace designed for creators, filmmakers, photographers, podcasters, and musicians to discover and share creative production spaces.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/studios" className="hover:text-foreground transition-colors">
                  Explore Studios
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Studio Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Categories
            </h3>
            <Suspense fallback={
                <div className="flex items-center gap-4">
                  <Spinner className='mx-auto' />
                </div>
              }>
                <FooterCats />
            </Suspense>
          </div>

          {/* Column 4: Newsletter & Socials */}
          <FooterForm />

        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="mt-12 pt-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/70">
            &copy; 2026 StudioSpace. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            {/* New X Logo (Twitter Rebrand) */}
            <a 
              href="https://x.com/mahfuz_tamim" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="X (formerly Twitter)"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>

            {/* Linkedin Link */}
            <a 
              href="https://www.linkedin.com/in/md-mahfuzul-alam-tamim/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LInkedin"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
    );
};

export default Footer;
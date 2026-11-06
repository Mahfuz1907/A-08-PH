import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import StudioProvider from '@/components/StudioContext/StudioContext'
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToaster } from "@/components/theme-toaster";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Studio Space",
  description: "A modern studio space for creative professionals",
  icons:{
    icon: '/icon.png'
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.className, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
        <StudioProvider>
        <Suspense fallback={
          <div className="flex items-center gap-4">
            <Spinner className='mx-auto' />
          </div>
        }>
          <Navbar />
        </Suspense>
        <div className="grow">{children}</div>
        <Footer />
        
        <ThemeToaster />
        </StudioProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

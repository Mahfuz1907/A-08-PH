import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";
import StudioProvider from '@/components/StudioContext/StudioContext'

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
      className={`${inter.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
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
        
        <Toaster/>
        </StudioProvider>
      </body>
    </html>
  );
}

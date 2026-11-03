import Banner from "@/components/Home/Banner/Banner";
import CategoryCards from "@/components/Home/CategoryCards/CategoryCards";
import FeaturedStudios from "@/components/Home/Featured/FeaturedStudios";
import HostGuarantee from "@/components/Home/HostGuarantee";
import HowItWorks from "@/components/Home/HowItWorks";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Suspense fallback={
        <div className="flex items-center gap-4">
            <Spinner className='mx-auto my-20' />
        </div>
      }>
        <Banner />
        <FeaturedStudios />
        <CategoryCards />
      </Suspense>
      <HowItWorks />
      <HostGuarantee />
    </div>
  );
}

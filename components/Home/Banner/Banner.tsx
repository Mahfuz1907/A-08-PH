import BannerSlider from "./BannerSlider";

const Banner = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/featured-studios`);
    const studios = await res.json(); 
    
    return (
        <div className="relative w-full bg-slate-950 py-12 lg:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BannerSlider studios={studios} />
          </div>
        </div>
    );
};

export default Banner;
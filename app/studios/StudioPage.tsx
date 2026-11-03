import StudioCard from './StudioCard';

interface Studio {
  _id?: string;
  title: string;
  category: string;
  "hourly-rate": number;
  location: string;
  imageUrl: string;
  description: string;
}

const StudioPage = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios`)
    const studios = await res.json()
    return (
        <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 inline-block mb-3">
            Explore Directory
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Available Creative Studios
          </h1>
          <p className="text-slate-400 mt-2 text-sm md:text-base">
            Discover professional sound stages, photo lofts, and podcast rooms for your next production.
          </p>
        </div>

        {/* Studios Grid */}
        {studios.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {studios.map((studio: Studio, index: number) => (
              <StudioCard key={index} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-lg">No studios found or database is loading...</p>
          </div>
        )}
      </div>
        </div>
    );
};

export default StudioPage;
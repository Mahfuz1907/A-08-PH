import React from "react";
import CardsDesign from "./CardsDesign";

interface Category{
    _id: string,
    title: string, 
    slug: string,
    description: string,
    icon: string, 
    count: string,
    imageUrl: string
}

const CategoryCards = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`)
    const categories = await res.json()
    return (
        <section className="py-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 inline-block mb-3">
            Explore By Type
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Browse by Studio Categories
          </h2>
          <p className="text-slate-400 mt-3 text-sm md:text-base">
            Find the ideal creative environment tailored specifically to your production needs.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat:Category) => 
            <CardsDesign key={cat._id} cat={cat} />
          )}
        </div>
      </div>
    </section>
    );
};

export default CategoryCards;
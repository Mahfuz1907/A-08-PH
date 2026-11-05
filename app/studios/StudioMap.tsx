'use client'

import { useContext } from 'react';
import StudioCard from './StudioCard';
import { StudioContext } from '@/components/StudioContext/StudioContext';
import { Studio } from '@/lib/type';
import { SearchX } from 'lucide-react';


const StudioMap = ({studios}:{studios:Studio[]}) => {
    const {byCategory} = useContext(StudioContext)
    let filterdStudio = studios.filter((studio) => studio.category === byCategory)
    if(byCategory === null || byCategory === ''){
        filterdStudio = [...studios]
    }
    return (
        <div>
            {filterdStudio.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filterdStudio.map((studio: Studio, index: number) => (
              <StudioCard key={index} studio={studio} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-muted/30 rounded-2xl border border-border text-center">
            <div className="bg-muted/50 p-4 rounded-full text-amber-500 mb-4">
              <SearchX className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">No Studios Available</h3>
            <p className="text-muted-foreground text-sm max-w-sm mt-1">
              There are currently no studios listed or matching your search criteria. Please check back later!
            </p>
          </div>
        )}
        </div>
    );
};

export default StudioMap;
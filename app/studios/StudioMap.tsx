'use client'

import { useContext } from 'react';
import StudioCard from './StudioCard';
import { StudioContext } from '@/components/StudioContext/StudioContext';

interface Studio {
  _id?: string;
  title: string;
  category: string;
  "hourly-rate": number;
  location: string;
  imageUrl: string;
  description: string;
}

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
          <div className="text-center py-20 bg-muted/50 rounded-2xl border border-border">
            <p className="text-muted-foreground text-lg">No studios found or database is loading...</p>
          </div>
        )}
        </div>
    );
};

export default StudioMap;
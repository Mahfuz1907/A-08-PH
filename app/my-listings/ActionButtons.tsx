import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import React from 'react';

interface Studio {
  _id: string;
  title: string;
  category: string;
  "hourly-rate": number;
  securityDeposit: number;
  maxCapacity: number;
  amenities: string;
  location: string;
  imageUrl: string;
  description: string;
}

const ActionButton = ({studio}:{studio:Studio}) => {
    return (
        <div className="grid grid-cols-2 gap-2 w-full">
            <Button variant="outline" className="border-slate-700 bg-slate-800/40 hover:bg-slate-800 text-slate-200 hover:text-white flex items-center gap-2">
            <Edit className="w-4 h-4 text-sky-400" />
            Update
            </Button>
            <Button variant="destructive" className="bg-red-600/80 hover:bg-red-600 text-white flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Delete
            </Button>
        </div>
    );
};

export default ActionButton;
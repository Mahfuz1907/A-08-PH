import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import DeleteStudio from './DeleteStudio';

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

const ActionButton = async({studio}:{studio:Studio}) => {
    return (
        <div className="grid grid-cols-2 gap-2 w-full">
            <Link href={`/studios/edit/${studio._id}`} className='w-full'>
            <Button variant="outline" className="border-slate-700 w-full bg-slate-800/40 hover:bg-slate-800 text-slate-200 hover:text-white flex items-center gap-2">
            <Edit className="w-4 h-4 text-sky-400" />
            Update
            </Button>
            </Link>

            {/* studio delete */}
            <DeleteStudio studio={studio} />
        </div>
    );
};

export default ActionButton;
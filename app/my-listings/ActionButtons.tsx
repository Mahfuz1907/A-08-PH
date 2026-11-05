import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import Link from 'next/link';
import DeleteStudio from './DeleteStudio';
import { Studio } from '@/lib/type';


const ActionButton = async({studio}:{studio:Studio}) => {
    return (
        <div className="grid grid-cols-2 gap-2 w-full">
            <Link href={`/studios/edit/${studio._id}`} className='w-full'>
            <Button variant="outline" className="border-border w-full bg-muted/40 hover:bg-muted text-foreground/90 hover:text-foreground flex items-center gap-2">
            <Edit className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            Update
            </Button>
            </Link>

            {/* studio delete */}
            <DeleteStudio studio={studio} />
        </div>
    );
};

export default ActionButton;
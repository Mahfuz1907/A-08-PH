import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Users } from "lucide-react";
import ActionButton from "./ActionButtons";
import Link from "next/link";

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

interface ListCardProps {
  studio: Studio;
}

const ListCard = ({ studio }: ListCardProps) => {
  return (
    <Link href={`/studios/${studio._id || ''}`}>
    <Card className="bg-slate-900/50 border-slate-800 text-white overflow-hidden hover:border-slate-700 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Studio Image */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-800">
          <Image
            src={studio.imageUrl || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"}
            alt={studio.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
          <Badge className="absolute top-3 right-3 bg-sky-600/90 text-white hover:bg-sky-500">
            {studio.category}
          </Badge>
        </div>

        {/* Card Header & Content */}
        <CardHeader className="pb-3 mt-2">
          <CardTitle className="text-xl font-bold tracking-wide truncate">{studio.title}</CardTitle>
          <div className="flex items-center text-slate-400 text-sm gap-1 mt-1">
            <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="truncate">{studio.location}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pb-3 text-sm text-slate-300">
          <div className="grid grid-cols-2 gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Rate: <strong className="text-white">${studio["hourly-rate"]}/hr</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Capacity: <strong className="text-white">{studio.maxCapacity}</strong></span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {studio.amenities && typeof studio.amenities === 'string' && 
                studio.amenities.split(",").map((amen, index) => (
                <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-sky-300 border border-slate-700/60"
                >       
                    {amen.trim()}
                </span>
                ))
            }
          </div>
        </CardContent>
      </div>

      {/* Action Buttons (Update & Delete - No functionality required for now) */}
      <CardFooter className="pt-2 w-full">
        <ActionButton studio={studio} />
      </CardFooter>
    </Card>
    </Link>
  );
}

export default ListCard;
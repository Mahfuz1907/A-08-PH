import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Users } from "lucide-react";
import ActionButton from "./ActionButtons";
import Link from "next/link";
import { Studio } from "@/lib/type";

const ListCard = ({ studio }: {studio: Studio}) => {
  return (
    <Card className="bg-muted/50 border-border text-foreground overflow-hidden hover:border-foreground/25 transition-all duration-300 flex flex-col justify-between">
      <Link href={`/studios/${studio._id || ''}`}>
        {/* Studio Image */}
        <div className="relative h-48 w-full overflow-hidden bg-muted">
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
          <div className="flex items-center text-muted-foreground text-sm gap-1 mt-1">
            <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
            <span className="truncate">{studio.location}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pb-3 text-sm text-foreground/80">
          <div className="grid grid-cols-2 gap-2 bg-muted/40 p-2.5 rounded-lg border border-border/60">
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Rate: <strong className="text-foreground">${studio["hourly-rate"]}/hr</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Capacity: <strong className="text-foreground">{studio.maxCapacity}</strong></span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {studio.amenities && typeof studio.amenities === 'string' && 
                studio.amenities.split(",").map((amen, index) => (
                <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-sky-700 dark:text-sky-300 border border-border/60"
                >       
                    {amen.trim()}
                </span>
                ))
            }
          </div>
        </CardContent>
      </Link>

      {/* Action Buttons (Update & Delete - No functionality required for now) */}
      <CardFooter className="pt-2 w-full">
        <ActionButton studio={studio} />
      </CardFooter>
    </Card>
  );
}

export default ListCard;
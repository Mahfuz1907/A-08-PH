import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import CancelBooking from "./CancelBooking";

interface BookingCardProps {
    _id: string;
    studioTitle: string;
    bookingDate: string;
    startTime: string;
    endTime: string;
    ["hourly-rate"]: number;
    status: string;
}

export default function BookingCard({ booking }: {booking: BookingCardProps}) {
    return (
        <Card className="bg-card border-border text-foreground flex flex-col justify-between">
            <CardHeader className="space-y-2 pb-3">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-sky-600 dark:text-sky-400">{booking.studioTitle}</h3>
                    {/* Status Badge */}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                        booking.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
                        booking.status === 'Pending' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' :
                        booking.status === 'Completed' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20' :
                        'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                    }`}>
                        {booking.status}
                    </span>
                </div>
            </CardHeader>

            <CardContent className="space-y-2 text-sm text-muted-foreground pb-3">
                <p>📅 Date: {booking.bookingDate}</p>
                <p>⏰ Time: {booking.startTime} - {booking.endTime}</p>
                <p className="font-medium text-emerald-600 dark:text-emerald-400">Hourly Rate: ${booking["hourly-rate"]}/hr</p>
            </CardContent>

            <CardFooter className="pt-2 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                <span>ID: {booking._id.slice(-6)}</span>
                {booking.status === 'Pending' && (
                    <CancelBooking booking={booking} />
                )}
            </CardFooter>
        </Card>
    );
}
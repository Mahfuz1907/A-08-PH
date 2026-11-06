'use client'

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import CancelBooking from "./CancelBooking";
import { Bookings } from "@/lib/type";
import DeleteBooking from "./DeleteBooking";
import { Calendar, Clock, DollarSign, Timer } from "lucide-react";



export default function BookingCard({ booking }: {booking: Bookings}) {
    const startTime = booking.startTime
    const endTime = booking.endTime
    const [startHour, startMin] = startTime.split(':').map(Number)
    const [endHour, endMin] = endTime.split(':').map(Number)
    const startTotalMin = startHour * 60 + startMin
    const endTotalMin = endHour * 60 + endMin
    const diffMins = endTotalMin - startTotalMin
    const totalHour = diffMins / 60
    const totalCost = totalHour * booking["hourly-rate"]
    const total = Math.round(totalCost)

    return (
        <Card className="bg-card border-border text-foreground flex flex-col justify-between">
            <div>
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
                <div className="bg-card text-card-foreground border border-border rounded-xl p-4 shadow-sm space-y-3">
    
                {/* Date & Time Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm border-b border-border pb-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-sky-500 shrink-0" />
                        <span className="font-medium text-foreground">{booking.bookingDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 text-sky-500 shrink-0" />
                        <span className="font-medium text-foreground">{booking.startTime} - {booking.endTime}</span>
                    </div>
                </div>

                {/* Duration & Hourly Rate Grid */}
                <div className="grid grid-cols-2 gap-2 text-sm py-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Timer className="w-4 h-4 text-amber-500 shrink-0" />
                        <div>
                            <p className="text-xs">Duration</p>
                            <p className="font-semibold text-foreground">{diffMins} mins</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground justify-end">
                        <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
                        <div>
                            <p className="text-xs text-right">Hourly Rate</p>
                            <p className="font-semibold text-foreground">${booking["hourly-rate"]}/hr</p>
                        </div>
                    </div>
                </div>

            {/* Total Cost Highlight Box */}
            <div className="flex items-center justify-between pt-3 mt-2 border-t border-border bg-emerald-50/50 dark:bg-emerald-950/20 -mx-4 -mb-4 p-4 rounded-b-xl">
                <span className="text-sm font-semibold text-muted-foreground">Total Payable</span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                    ${total}
                </span>
            </div>

        </div>
            </CardContent>
            </div>

            <CardFooter className="pt-2 w-full border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                {booking.status === 'Pending' ? (
                    <CancelBooking booking={booking} />
                ):(
                    <DeleteBooking booking={booking} />
                )
            }
            </CardFooter>
        </Card>
    );
}
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        <Card className="bg-slate-900 border-slate-800 text-white flex flex-col justify-between">
            <CardHeader className="space-y-2 pb-3">
                <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg text-indigo-400">{booking.studioTitle}</h3>
                    {/* Status Badge */}
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${
                        booking.status === 'Confirmed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        booking.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        booking.status === 'Completed' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                        {booking.status}
                    </span>
                </div>
            </CardHeader>

            <CardContent className="space-y-2 text-sm text-slate-300 pb-3">
                <p>📅 Date: {booking.bookingDate}</p>
                <p>⏰ Time: {booking.startTime} - {booking.endTime}</p>
                <p className="font-medium text-emerald-400">Hourly Rate: ${booking["hourly-rate"]}/hr</p>
            </CardContent>

            <CardFooter className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
                <span>ID: {booking._id.slice(-6)}</span>
                {booking.status === 'Pending' && (
                    <Button 
                        variant="destructive"
                        size="sm"
                        className="bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 text-xs font-medium h-8 px-3 cursor-pointer transition-colors"
                    >
                        Cancel Booking
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
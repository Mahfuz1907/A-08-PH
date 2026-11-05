'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface BookingCardProps {
    _id: string;
    studioTitle: string;
    bookingDate: string;
    startTime: string;
    endTime: string;
    ["hourly-rate"]: number;
    status: string;
}


const CancelBooking = ({booking}:{booking:BookingCardProps}) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleCancel = async() => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/bookings/delete/${booking._id}`, {
            method: "DELETE",
        });

        if(res.ok){
            toast.success(`${booking.studioTitle} deleted successfully`, {position: 'top-center'})
            router.refresh()
        }

        setOpen(false);
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="destructive"
            size="sm"
            className="bg-rose-600/10 hover:bg-rose-600 text-rose-600 dark:text-rose-400 hover:text-white border border-rose-500/30 text-xs font-medium h-8 px-3 cursor-pointer transition-colors"
            />
        }
      >
        Cancel Booking
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-500">
            <Trash2 aria-hidden="true" />
          </AlertDialogMedia>
          <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel booking of {" "}
            <strong className="font-semibold text-foreground">
              {booking.studioTitle}
            </strong>
            ? This action cannot be undone. This will permanently remove the
            package and all its data from the servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="h-9 rounded-md border-border bg-background px-4 text-sm text-foreground hover:bg-muted">
            Close
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCancel}
            className="h-9 gap-2 rounded-md bg-rose-600 px-4 text-sm font-semibold text-white hover:bg-rose-700"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Cancel Booking
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
        </AlertDialog>
    );
};

export default CancelBooking;
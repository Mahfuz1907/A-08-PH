'use client'

import { useSession } from "@/app/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Studio } from "@/lib/type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


const BookingDialogueBox = ({studio}:{studio:Studio}) => {
    const router = useRouter()
    const {data:session} = useSession()
    const user = session?.user

    const [isOpen, setIsOpen] = useState(false);
    
    const handleBookingSubmit = async (e:React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const form = Object.fromEntries(formData)

        const bookingData = {
            studioId: studio._id,
            studioTitle: studio.title,
            studioImage: studio.imageUrl,
            ["hourly-rate"]: studio["hourly-rate"],
            bookingDate: form.bookingDate,
            startTime: form.startTime,
            endTime: form.endTime,
            userName: user?.name,
            userEmail: user?.email,
            status: "Pending"
        };

        const token = await getTokenFromClient()

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add-bookings`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify(bookingData)
        })

        const bookingsData = await res.json()

        if(res.ok){
            toast.success(`${bookingData.studioTitle} booked by ${bookingData.userName} successfully`, {position: 'top-center'})
            router.push('/my-bookings')
        }else{
            toast.error(bookingsData.message, {position: 'top-center'})
        }

        setIsOpen(false);
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className="bg-sky-600 w-full hover:bg-sky-700 text-white font-semibold px-6 py-1 rounded-xl shadow-lg shadow-sky-600/20">
                Book Workspace Now
            </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-sky-600 dark:text-sky-400">
                Book: {studio.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
                Rate: ${studio["hourly-rate"] || studio['hourly-rate']}/hr • Location: {studio.location}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBookingSubmit} className="space-y-4 pt-2">
                    {/* Booking Date */}
                    <div>
                        <label className="text-sm font-medium text-foreground">Select Date</label>
                        <input 
                            type="date" 
                            name="bookingDate"
                            required
                            className="w-full mt-1 bg-background border border-border rounded-md p-2.5 text-foreground text-sm focus:outline-none focus:border-sky-500"
                        />
                    </div>

                    {/* Time Slots (Start Time & End Time) */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-sm font-medium text-foreground">Start Time</label>
                            <input 
                                type="time" 
                                name="startTime"
                                required
                                className="w-full mt-1 bg-background border border-border rounded-md p-2.5 text-foreground text-sm focus:outline-none focus:border-sky-500"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-foreground">End Time</label>
                            <input 
                                type="time" 
                                name="endTime"
                                required
                                className="w-full mt-1 bg-background border border-border rounded-md p-2.5 text-foreground text-sm focus:outline-none focus:border-sky-500"
                            />
                        </div>
                    </div>

                    {/* User Info (Read-only) */}
                    <div className="grid grid-cols-1 gap-3 pt-1">
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Your Name</label>
                            <input 
                                type="text" 
                                value={user?.name} 
                                readOnly 
                                className="w-full mt-1 bg-muted/50 border border-border rounded-md p-2.5 text-muted-foreground text-sm cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground">Your Email</label>
                            <input 
                                type="email" 
                                value={user?.email} 
                                readOnly 
                                className="w-full mt-1 bg-muted/50 border border-border rounded-md p-2.5 text-muted-foreground text-sm cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit" 
                        className="w-full bg-sky-600 hover:bg-sky-500 text-white font-medium py-2.5 mt-2 cursor-pointer"
                    >
                        Book Reservation
                    </Button>
                </form>
        </DialogContent>
    </Dialog>
    );
};

export default BookingDialogueBox;
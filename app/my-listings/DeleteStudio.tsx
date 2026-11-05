"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

const DeleteStudio = ({studio}:{studio:Studio}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios/delete/${studio._id}`, {
      method: "DELETE",
    });

    if(res.ok){
        toast.success(`${studio.title} deleted successfully`, {position: 'top-center'})
        router.refresh()
    }

    setOpen(false);
  };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="destructive" 
            className="bg-red-600/80 hover:bg-red-600 text-white flex items-center gap-2"
            />
        }
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-500">
            <Trash2 aria-hidden="true" />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Studio</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <strong className="font-semibold text-foreground">
              {studio.title}
            </strong>
            ? This action cannot be undone. This will permanently remove the
            package and all its data from the servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="h-9 rounded-md border-border bg-background px-4 text-sm text-foreground hover:bg-muted">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="h-9 gap-2 rounded-md bg-rose-600 px-4 text-sm font-semibold text-white hover:bg-rose-700"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Delete Package
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteStudio;
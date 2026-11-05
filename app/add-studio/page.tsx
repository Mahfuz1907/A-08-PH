import { Suspense } from "react";
import AddAfterSuspense from "./AddNewStudioPage";
import { Spinner } from "@/components/ui/spinner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Studio | Studio Space",
  description: "A modern studio space for creative professionals",
  icons:{
    icon: '/icon.png'
  }
};

const AddNewStudioPage = async() => {
    return (
        <Suspense
        fallback={
          <div className="flex items-center gap-4">
            <Spinner className="mx-auto" />
          </div>
        }>
          <AddAfterSuspense />
        </Suspense>
    );
};

export default AddNewStudioPage;
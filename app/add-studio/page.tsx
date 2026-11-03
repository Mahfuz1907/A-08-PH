import { Suspense } from "react";
import AddAfterSuspense from "./AddNewStudioPage";
import { Spinner } from "@/components/ui/spinner";

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
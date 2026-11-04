import { Spinner } from '@/components/ui/spinner'
import React, { Suspense } from 'react'
import StudioEditPage from './StudioEditPage'

interface StudioEditProps{
    params: Promise<{id: string}>
}

const Page = ({params}:StudioEditProps) => {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
                <Spinner className='mx-auto my-20' />
            </div>
        }>
            <StudioEditPage params={params} />
        </Suspense>
    )
}

export default Page
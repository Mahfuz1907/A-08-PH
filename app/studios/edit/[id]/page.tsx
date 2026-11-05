import { Spinner } from '@/components/ui/spinner'
import React, { Suspense } from 'react'
import StudioEditPage from './StudioEditPage'

interface StudioEditProps{
    params: Promise<{id: string}>
}

export async function generateMetadata ({params}:StudioEditProps) {
    const {id} = await params
    if(!id){
        return {
            title: "Invalid Url | Studio Space",
            description: "A modern studio space for creative professionals",
            icons:{
                icon: '/icon.png'
            }
        }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios/${id}`)

    if (!res.ok) {
        return {
            title: "Invalid Url | Studio Space",
            description: "A modern studio space for creative professionals",
            icons:{
                icon: '/icon.png'
            }
        }
    }

    const studio = await res.json()
    
    if (!studio) {
        return {
            title: "Invalid Url | Studio Space",
            description: "A modern studio space for creative professionals",
            icons:{
                icon: '/icon.png'
            }
        }
    }

    return {
        title: `Update ${studio.title} | Studio Space`,
        description: "A modern studio space for creative professionals",
        icons:{
            icon: '/icon.png'
        }
    }
};

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
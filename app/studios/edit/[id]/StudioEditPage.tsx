import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2 } from 'lucide-react'
import EditForm from './EditForm'

interface StudioEditProps{
    params: Promise<{id: string}>
}

const StudioEditPage = async ({params}:StudioEditProps) => {
    const {id} = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios/${id}`)
    const studio = await res.json()

    const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`)
    const categories = await categoryResponse.json()

    return(
        <div className='max-w-3xl mx-auto py-10 px-4 sm:px-6'>
        <Card className="bg-slate-900 border-slate-800 px-5 py-10 text-white shadow-xl w-full mx-auto flex flex-col justify-between items-start gap-6">
        <CardHeader className="space-y-1 w-full flex flex-col justify-between items-start gap-2">
          <div className="flex items-center space-x-2 text-sky-400 mb-1">
            <Building2 className="w-6 h-6" />
            <span className="text-xs font-semibold uppercase tracking-wider">Host Portal</span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">List Your Creative Space</CardTitle>
          <CardDescription className="text-slate-400">
            Provide details about your studio, pricing, and location to connect with creators.
          </CardDescription>
        </CardHeader>
        
        {/* edit form */}
        <EditForm categories={categories} studio={studio} />
        </Card>
        </div>
    )
}

export default StudioEditPage
'use client'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { uploadUrlToImgbb } from '@/lib/UploadImage'
import { DollarSign, FileText, ImageIcon, MapPin, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


interface Category{
    _id: string,
    title: string, 
    slug: string,
    description: string,
    icon: string, 
    count: string,
    imageUrl: string
}

interface Studio {
  _id?: string;
  title: string;
  category: string;
  "hourly-rate": number;
  location: string;
  imageUrl: string;
  description: string;
  securityDeposit: number;
  maxCapacity: number;
  amenities: string;
  hostName: string;
  hostEmail: string
}

interface EditFormTypes{
    categories: Category[],
    studio: Studio
}

const EditForm = ({categories, studio}:EditFormTypes) => {
    const router = useRouter()

    const handleEdit = async(e:React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const editedData = Object.fromEntries(formData)
        
        const userInputImageUrl = editedData.imageUrl as string
        const finalImageUrl = await uploadUrlToImgbb(userInputImageUrl)
        editedData.imageUrl = finalImageUrl

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios/edit/${studio._id}`, {
                method: 'PUT',
                headers:{
                  "Content-Type": 'application/json'
                },
                body:JSON.stringify(editedData)
            })
        
            const studioData = await res.json()
        
            if(res.ok && (studioData.acknowledged || studioData.insertedId)){
              toast.success(`${editedData.title} updated successfully successfully`, { position: "top-center" })
              router.refresh()
              router.push('/my-listings')
            }else {
              toast.error("Failed to update studio. Please try again.", {position: 'top-center'});
            }
    }
    return (
        <CardContent className="w-full">
          <form onSubmit={handleEdit} className="w-full flex flex-col justify-between items-start gap-6">
            {/* Studio Title */}
            <div className="flex flex-col justify-between items-start gap-2 w-full">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" /> Studio Title
              </label>
              <Input 
                type="text"
                name='title' 
                defaultValue={studio.title}
                placeholder="e.g., Apex Cinema Sound Stage & Cyclorama" 
                className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-sky-500"
                required 
              />
            </div>

            {/* category */}
            <div className="w-full flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-slate-300">Category</label>
                <select
                  name="category" 
                  defaultValue={studio.category}
                  className="w-full h-10 px-3 rounded-md bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                >
                  <option value="">Select Category</option>
                  {
                    categories.map((cat:Category) => 
                    <option key={cat._id} value={cat.title}>{cat.title}</option>
                    )
                  }
                </select>
            </div>

            {/* Hourly Rate, Security Deposit Grid & Max Capacity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 justify-between items-center gap-4 w-full">
              <div className="flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-sky-400" /> Hourly Rate ($)
                </label>
                <Input
                  name="hourly-rate" 
                  type="number"
                  defaultValue={studio["hourly-rate"]} 
                  placeholder="e.g., 75" 
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-sky-500"
                  required 
                />
              </div>

              <div className="flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-sky-400" /> Security Deposit ($)
                </label>
                <Input
                  name="securityDeposit" 
                  type="number" 
                  defaultValue={studio.securityDeposit}
                  placeholder="e.g., 100" 
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-sky-500"
                  required 
                />
              </div>

              <div className="flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-slate-300">Max Capacity (Persons)</label>
                <Input 
                  type="number"
                  name="maxCapacity"
                  defaultValue={studio.maxCapacity}
                  placeholder="e.g., 25"
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-sky-500"
                  required
                />
              </div>
            </div>

            {/* Location Grid & Image URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full justify-between items-center"> 
              <div className="flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-400" /> Location / Address
                </label>
                <Input 
                  type="text" 
                  name="location"
                  defaultValue={studio.location}
                  placeholder="e.g., 454 Creative Ave, Downtown, Los Angeles" 
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-sky-500"
                  required 
                />
              </div>

              <div className="flex flex-col justify-between items-start gap-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-sky-400" /> Studio Image URL
              </label>
              <Input 
                type="string"
                name="imageUrl"
                defaultValue={studio.imageUrl} 
                placeholder="https://images.unsplash.com/..." 
                className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-sky-500"
                required 
              />
            </div>
            </div>

            {/* Amenities List */}
            <div className="flex flex-col justify-between items-start gap-2 w-full">
              <label className="text-sm font-medium text-slate-300">Amenities (Comma separated tags)</label>
              <Input 
                type="text"
                name="amenities"
                defaultValue={studio.amenities}
                placeholder="e.g., High-speed Wi-Fi, AC, 4K Lighting, Sound Proofing"
                className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-sky-500"
              />
            </div>

            {/* Description & Detailed Overview */}
            <div className="flex flex-col justify-between items-start gap-2 w-full">
              <label className="text-sm font-medium text-slate-300">Detailed Overview & Equipment Details</label>
              <Textarea 
                name="description"
                defaultValue={studio.description}
                placeholder="Describe lighting setups, gear included, soundproofing, and space dimensions..." 
                className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 min-h-30 focus-visible:ring-sky-500"
                required 
              />
            </div>

            {/* Read-only User Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full justify-between items-center">
              <div className="flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-slate-300">Host Name</label>
                <Input 
                  type="text"
                  name="hostName"
                  value={studio.hostName}
                  readOnly
                  className="bg-slate-900 border-slate-800 text-slate-400 cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-slate-300">Host Email</label>
                <Input 
                  type="email"
                  name="hostEmail"
                  value={studio.hostEmail}
                  readOnly
                  className="bg-slate-900 border-slate-800 text-slate-400 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 transition-colors"
            >
              <Save />
              Save Studio
            </Button>

          </form>
        </CardContent>
    );
};

export default EditForm;
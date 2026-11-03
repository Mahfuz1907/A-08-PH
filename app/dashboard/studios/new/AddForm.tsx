'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, DollarSign, MapPin, ImageIcon, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Category{
    _id: string,
    title: string, 
    slug: string,
    description: string,
    icon: string, 
    count: string,
    imageUrl: string
}

const AddForm = ({categories}:{categories:Category[]}) => {
    const router = useRouter()

    const handleSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formElement = new FormData(e.currentTarget)
    const form = Object.fromEntries(formElement)

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add-studio`, {
        method: 'POST',
        headers:{
          "Content-Type": 'application/json'
        },
        body:JSON.stringify(form)
    })

    const studioData = await res.json()

    if(studioData.acknowledged){
      toast.success(`${form.title} added successfully`, { position: "top-center" })
      router.push('/studios')
    }

    console.log(studioData.acknowledged)
  };

    return (
        <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2 text-sky-400 mb-1">
            <Building2 className="w-6 h-6" />
            <span className="text-xs font-semibold uppercase tracking-wider">Host Portal</span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">List Your Creative Space</CardTitle>
          <CardDescription className="text-slate-400">
            Provide details about your studio, pricing, and location to connect with creators.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Studio Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" /> Studio Title
              </label>
              <Input 
                type="text"
                name='title' 
                placeholder="e.g., Apex Cinema Sound Stage & Cyclorama" 
                className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-sky-500"
                required 
              />
            </div>

            {/* Category & Hourly Rate Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Category</label>
                <select
                  name="category" 
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

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-sky-400" /> Hourly Rate ($)
                </label>
                <Input
                  name="hourly-rate" 
                  type="number" 
                  placeholder="e.g., 75" 
                  className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-sky-500"
                  required 
                />
              </div>
            </div>

            {/* Location / Address */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sky-400" /> Location / Address
              </label>
              <Input 
                type="text" 
                name="location"
                placeholder="e.g., 454 Creative Ave, Downtown, Los Angeles" 
                className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-sky-500"
                required 
              />
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-sky-400" /> Studio Image URL
              </label>
              <Input 
                type="url"
                name="imageUrl" 
                placeholder="https://images.unsplash.com/..." 
                className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-sky-500"
                required 
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Description & Equipment Details</label>
              <Textarea 
                name="description"
                placeholder="Describe lighting setups, gear included, soundproofing, and space dimensions..." 
                className="bg-slate-950 border-slate-800 text-white placeholder:text-slate-600 min-h-30 focus-visible:ring-sky-500"
                required 
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 transition-colors"
            >
            </Button>

          </form>
        </CardContent>
      </Card>
    );
};

export default AddForm;
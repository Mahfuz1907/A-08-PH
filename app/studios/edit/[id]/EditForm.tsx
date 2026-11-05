'use client'

import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Category, Studio } from '@/lib/type'
import { uploadUrlToImgbb } from '@/lib/UploadImage'
import { DollarSign, FileText, ImageIcon, MapPin, Save, Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


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

        const amenities = []
        if(editedData.wifi === 'on') amenities.push('Wifi')
        if(editedData.ac === 'on') amenities.push('AC')
        if(editedData.lighting === 'on') amenities.push('Lighting')
        if(editedData.greenScreens === 'on') amenities.push('Green Screens')
        if(editedData.parking === 'on') amenities.push('Parking')

        const studioData = {
          title: editedData.title,
          category: editedData.category,
          "hourly-rate": editedData["hourly-rate"],
          securityDeposit: editedData.securityDeposit,
          maxCapacity: editedData.maxCapacity,
          rating: editedData.rating,
          location: editedData.location,
          imageUrl: editedData.imageUrl,
          amenities,
          description: editedData.description,
          hostName: editedData.hostName,
          hostEmail: editedData.hostEmail
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/studios/edit/${studio._id}`, {
                method: 'PUT',
                headers:{
                  "Content-Type": 'application/json'
                },
                body:JSON.stringify(studioData)
            })
        
            const data = await res.json()
        
            if(res.ok && (data.acknowledged || data.insertedId)){
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
              <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Studio Title
              </label>
              <Input 
                type="text"
                name='title' 
                defaultValue={studio.title}
                placeholder="e.g., Apex Cinema Sound Stage & Cyclorama" 
                className="bg-background border-border text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-sky-500"
                required 
              />
            </div>

            {/* category */}
            <div className="w-full flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-foreground/80">Category</label>
                <select
                  name="category" 
                  defaultValue={studio.category}
                  className="w-full h-10 px-3 rounded-md bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
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

            {/* Hourly Rate, Security Deposit Grid, Max Capacity & Rating */}
            <div className="grid grid-cols-2 sm:grid-cols-4 justify-between items-center gap-4 w-full">
              <div className="flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Hourly Rate ($)
                </label>
                <Input
                  name="hourly-rate" 
                  type="number"
                  defaultValue={studio["hourly-rate"]} 
                  placeholder="e.g., 75" 
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-sky-500"
                  required 
                />
              </div>

              <div className="flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Security Deposit ($)
                </label>
                <Input
                  name="securityDeposit" 
                  type="number" 
                  defaultValue={studio.securityDeposit}
                  placeholder="e.g., 100" 
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-sky-500"
                  required 
                />
              </div>

              <div className="flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-foreground/80">Max Capacity (Persons)</label>
                <Input 
                  type="number"
                  name="maxCapacity"
                  defaultValue={studio.maxCapacity}
                  placeholder="e.g., 25"
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-sky-500"
                  required
                />
              </div>

              <div className="flex flex-col justify-between items-start gap-2">
              <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                <Star className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Rating (Out of 5)
              </label>
              <Input 
                type="number"
                name="rating" 
                step="any"
                defaultValue={studio.rating}
                placeholder="e.g., 5" 
                className="bg-background border-border text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-sky-500"
                required 
              />
              </div>
            </div>

            {/* Location Grid & Image URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full justify-between items-center"> 
              <div className="flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Location / Address
                </label>
                <Input 
                  type="text" 
                  name="location"
                  defaultValue={studio.location}
                  placeholder="e.g., 454 Creative Ave, Downtown, Los Angeles" 
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-sky-500"
                  required 
                />
              </div>

              <div className="flex flex-col justify-between items-start gap-2">
              <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Studio Image URL
              </label>
              <Input 
                type="string"
                name="imageUrl"
                defaultValue={studio.imageUrl} 
                placeholder="https://images.unsplash.com/..." 
                className="bg-background border-border text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-sky-500"
                required 
              />
            </div>
            </div>

            {/* Amenities List */}
            <div className="flex flex-col justify-between items-start gap-2 w-full">
              <FieldSet className="w-full">
                <FieldLegend variant="label" className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                  Amenities List
                </FieldLegend>
                <FieldGroup className="gap-3 flex flex-row w-full justify-between items-center border border-border px-5 py-2 rounded-lg">
                  <Field orientation="horizontal">
                    <Checkbox
                      id="wifi"
                      name="wifi"
                      defaultChecked={studio.amenities.includes('Wifi')}
                    />
                    <FieldLabel
                      htmlFor="wifi"
                      className="font-normal"
                    >
                     Wifi
                    </FieldLabel>
                  </Field>       
                  <Field orientation="horizontal">
                    <Checkbox
                      id="ac"
                      name="ac"
                      defaultChecked={studio.amenities.includes('AC')}
                    />
                    <FieldLabel
                      htmlFor="ac"
                      className="font-normal"
                    >
                     AC
                    </FieldLabel>
                  </Field>       
                  <Field orientation="horizontal">
                    <Checkbox
                      id="lighting"
                      name="lighting"
                      defaultChecked={studio.amenities.includes('Lighting')}
                    />
                    <FieldLabel
                      htmlFor="lighting"
                      className="font-normal"
                    >
                     Lighting
                    </FieldLabel>
                  </Field>       
                  <Field orientation="horizontal">
                    <Checkbox
                      id="greenScreens"
                      name="greenScreens"
                      defaultChecked={studio.amenities.includes('Green Screens')}
                    />
                    <FieldLabel
                      htmlFor="greenScreens"
                      className="font-normal"
                    >
                     Green Screens
                    </FieldLabel>
                  </Field>       
                  <Field orientation="horizontal">
                    <Checkbox
                      id="parking"
                      name="parking"
                      defaultChecked={studio.amenities.includes('Parking')}
                    />
                    <FieldLabel
                      htmlFor="parking"
                      className="font-normal"
                    >
                     Parking
                    </FieldLabel>
                  </Field>       
                </FieldGroup>
              </FieldSet>
            </div>

            {/* Description & Detailed Overview */}
            <div className="flex flex-col justify-between items-start gap-2 w-full">
              <label className="text-sm font-medium text-foreground/80">Detailed Overview & Equipment Details</label>
              <Textarea 
                name="description"
                defaultValue={studio.description}
                placeholder="Describe lighting setups, gear included, soundproofing, and space dimensions..." 
                className="bg-background border-border text-foreground placeholder:text-muted-foreground/70 min-h-30 focus-visible:ring-sky-500"
                required 
              />
            </div>

            {/* Read-only User Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full justify-between items-center">
              <div className="flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-foreground/80">Host Name</label>
                <Input 
                  type="text"
                  name="hostName"
                  value={studio.hostName}
                  readOnly
                  className="bg-card border-border text-muted-foreground cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-foreground/80">Host Email</label>
                <Input 
                  type="email"
                  name="hostEmail"
                  value={studio.hostEmail}
                  readOnly
                  className="bg-card border-border text-muted-foreground cursor-not-allowed"
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
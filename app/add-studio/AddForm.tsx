'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building2, DollarSign, MapPin, ImageIcon, FileText, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "../lib/auth-client";
import { uploadUrlToImgbb } from "@/lib/UploadImage";
import { Category } from "@/lib/type";
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";


const AddForm = ({categories}:{categories:Category[]}) => {
    const router = useRouter()
    const {data:session} = useSession()

    const handleSubmit = async(e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = new FormData(e.currentTarget)
    const form = Object.fromEntries(formElement)

    const userInputImageUrl = form.imageUrl as string
    const finalImageUrl = await uploadUrlToImgbb(userInputImageUrl)
    form.imageUrl = finalImageUrl

    const amenities = []
    if(form.wifi === 'on') amenities.push('Wifi')
    if(form.ac === 'on') amenities.push('AC')
    if(form.lighting === 'on') amenities.push('Lighting')
    if(form.greenScreens === 'on') amenities.push('Green Screens')
    if(form.parking === 'on') amenities.push('Parking')

    const studioData = {
      title: form.title,
      category: form.category,
      "hourly-rate": form["hourly-rate"],
      securityDeposit: form.securityDeposit,
      maxCapacity: form.maxCapacity,
      location: form.location,
      imageUrl: form.imageUrl,
      amenities,
      description: form.description,
      hostName: form.hostName,
      hostEmail: form.hostEmail
    }
    

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/add-studio`, {
        method: 'POST',
        headers:{
          "Content-Type": 'application/json'
        },
        body:JSON.stringify(studioData)
    })

    const data = await res.json()

    if(res.ok && (data.acknowledged || data.insertedId)){
      toast.success(`${form.title} added successfully`, { position: "top-center" })
      router.push('/my-listings')
    }else {
      toast.error("Failed to add studio. Please try again.", {position: 'top-center'});
    }
    };

    return (
        <Card className="bg-card border-border px-5 py-10 text-foreground shadow-xl w-full mx-auto flex flex-col justify-between items-start gap-6">
        <CardHeader className="space-y-1 w-full flex flex-col justify-between items-start gap-2">
          <div className="flex items-center space-x-2 text-sky-600 dark:text-sky-400 mb-1">
            <Building2 className="w-6 h-6" />
            <span className="text-xs font-semibold uppercase tracking-wider">Host Portal</span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">List Your Creative Space</CardTitle>
          <CardDescription className="text-muted-foreground">
            Provide details about your studio, pricing, and location to connect with creators.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="w-full">
          <form onSubmit={handleSubmit} className="w-full flex flex-col justify-between items-start gap-6">
            
            {/* Studio Title */}
            <div className="flex flex-col justify-between items-start gap-2 w-full">
              <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" /> Studio Title
              </label>
              <Input 
                type="text"
                name='title' 
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
                      className="bg-background data-[state=checked]:bg-sky-600 data-[state=checked]:text-white dark:data-[state=checked]:bg-sky-500"
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
                  value={session?.user?.name}
                  readOnly
                  className="bg-card border-border text-muted-foreground cursor-not-allowed"
                />
              </div>
              <div className="flex flex-col justify-between items-start gap-2">
                <label className="text-sm font-medium text-foreground/80">Host Email</label>
                <Input 
                  type="email"
                  name="hostEmail"
                  value={session?.user?.email}
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
              Add Studio
            </Button>

          </form>
        </CardContent>
        </Card>
    );
};

export default AddForm;
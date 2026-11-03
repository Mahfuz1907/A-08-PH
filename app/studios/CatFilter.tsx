'use client'

import { StudioContext } from "@/components/StudioContext/StudioContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

interface Category{
    _id: string,
    title: string, 
    slug: string,
    description: string,
    icon: string, 
    count: string,
    imageUrl: string
}

interface Item{
    label: string,
    value: null | string
}

const CatFilter = ({categories}:{categories: Category[]}) => {
    const {byCategory, setByCategory} = useContext(StudioContext)
    const searchParams = useSearchParams()
    const queryCategory = searchParams.get("category")
    
    useEffect(() => {
        if(queryCategory){
            setByCategory(queryCategory)
        }
    }, [queryCategory, setByCategory])
    console.log(byCategory)

    const items:Item[] = [
        { label: "Select a category", value: null },
    ]

    categories.forEach((cat) => {
        const label = cat.title
        const value = cat.slug
        items.push({label: label, value: value})
    })

    return (
        <Select items={items} value={byCategory || ''} onValueChange={setByCategory} >
      <SelectTrigger className="w-full max-w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    );
};

export default CatFilter;
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
import { useContext } from "react";

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
    const {setByCategory} = useContext(StudioContext)

    const items:Item[] = [
        { label: "Select a category", value: null },
    ]

    categories.forEach((cat) => {
        const label = cat.title
        const value = cat.slug
        items.push({label: label, value: value})
    })

    return (
        <Select items={items} onValueChange={setByCategory} >
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
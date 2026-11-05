'use client'

import { StudioContext } from "@/components/StudioContext/StudioContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Category } from "@/lib/type";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";


const CatFilter = ({categories}:{categories: Category[]}) => {
    const {byCategory, setByCategory} = useContext(StudioContext)
    const searchParams = useSearchParams()
    const queryCategory = searchParams.get("category")
    
    useEffect(() => {
        if(queryCategory){
            setByCategory(queryCategory)
        }
    }, [queryCategory, setByCategory])

    return (
    <Tabs 
    defaultValue={''}
    value={byCategory || ''}
    onValueChange={setByCategory}>
      <TabsList>
        <TabsTrigger value="">
          All
        </TabsTrigger>
        {
          categories.map((cat) => 
          <TabsTrigger key={cat.slug} value={cat.slug}>
            {cat.title}
          </TabsTrigger>)
        }
      </TabsList>
    </Tabs>
    );
};

export default CatFilter;
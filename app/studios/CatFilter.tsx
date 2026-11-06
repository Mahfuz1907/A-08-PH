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
      <TabsList className={'flex flex-row justify-start items-center overflow-x-auto whitespace-nowrap w-full scrollbar-none'}>
        <TabsTrigger value="" className={'shrink-0 min-w-max'}>
          All
        </TabsTrigger>
        {
          categories.map((cat) => 
          <TabsTrigger key={cat.slug} value={cat.slug} className={'shrink-0 min-w-max'}>
            {cat.title}
          </TabsTrigger>)
        }
      </TabsList>
    </Tabs>
    );
};

export default CatFilter;
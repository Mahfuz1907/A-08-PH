'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"


interface StudioContextTypes{
    byCategory: string | null,
    setByCategory: Dispatch<SetStateAction<string | null>>
}

export const StudioContext = createContext<StudioContextTypes>({
    byCategory: '',
    setByCategory: () => {}
})

const StudioProvider = ({children}:{children:ReactNode}) => {
    const [byCategory, setByCategory] = useState<string | null>('')

    const sharedData = {
        byCategory,
        setByCategory
    }

    return (
        <StudioContext.Provider value={sharedData}>
            {children}
        </StudioContext.Provider>
    )
}

export default StudioProvider
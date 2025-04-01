import React, { ReactNode } from "react"


type parentProps ={
    children?: ReactNode
    height: string
    width: string
    color?: string
    black?: string
    textColor?:string
}

export const ReactangelDivs : React.FC<parentProps> =({children, color, width, height, black, textColor})=>{
    return (
            <button className={`h-${height} w-${width} bg-${color}-100 bg-${black} text-${textColor} border rounded-md shadow-lg transition-transform ease-in duration-75 hover:translate-y-[-4px] `}>
           {children}
            </button>
       
)}
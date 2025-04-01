import { useState } from "react"
import { Navbar } from "../components/Navbar"
import { UserShopDocCard } from "../components/UserShopDocCard"
import { GlobalNavbar } from "../components/NavBarGlobal"

interface UserShopDocs{
    metaData: string
    Tags: string[]
    Date: string
Title: string
DocsId: string

}



export const UserShop=()=>{
    const [docs, setDocs]= useState<UserShopDocs[]>([]);

    return (
        <div className="h-screen">
          <div className="border-b">
          <GlobalNavbar/>
          </div>
          <div className="h-8 bg-gray-100 flex justify-end ">
            <h1 className="pr-8"><pre>Welcome to Vivans Store</pre></h1>
          </div>
          <div className=" w-full bg-gray-50 flex flex-col fixed left-0">
            <div className="flex items-center justify-end mt-5">

            </div>
            <div className="overflow-y-auto min-h-screen w-full flex items-start justify-start p-4 gap-2 ">
                
                    
            

            </div>
          </div>
        </div>
    )
}
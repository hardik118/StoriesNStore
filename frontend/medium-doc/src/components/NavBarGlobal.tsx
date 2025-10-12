import { FunctionalButton } from "./ButtonsWordPlus"
import {  useNavigate } from "react-router-dom"

export const GlobalNavbar=()=>{
    const navigate= useNavigate();
    const userId= localStorage.getItem("userId");

    



    return (
        <div className="row-span-1 flex items-start justify-between  p-1 ">
                <div  className="w-2/3 h-full flex items-center justify-between   gap-2">
        
        <h3 className="text-3xl font-sanserif p-1 font-semibold ">Stories</h3>
        
       
              
                </div>
                 <div className=" w-1/3  h-full flex items-center justify-end gap-3 p-1 ">
                 <FunctionalButton heading="Write" color="blue"  onClick={()=>navigate('/WriteBlog')}/>
                 <FunctionalButton heading="Store" onClick={()=>{
                    navigate('/Store')
                 }} />
                  <FunctionalButton heading="userShop" color="purple" onClick={()=>{
                    navigate(`/UserShop/${userId}`)
                 }} />

                  <FunctionalButton heading="Settings" color="green" onClick={()=>{
                    navigate(`/settings`)
                 }} />

                 </div>
               </div>
    )
}
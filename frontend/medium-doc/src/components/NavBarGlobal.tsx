import { FunctionalButton } from "./ButtonsWordPlus"
import {  useNavigate } from "react-router-dom"
export const GlobalNavbar=()=>{
    const navigate= useNavigate();

    return (
        <div className="row-span-1 flex items-start justify-between  p-1 ">
                <div  className="w-2/3 h-full flex items-center justify-between   gap-2">
        
        <h3 className="text-3xl font-sanserif p-1 font-semibold ">Stories</h3>
        
        <div className="w-1/2 bg-gray-200 rounded-lg h-10 border-2 border-gray-100 flex items-center justify-between ">
            <div>
            </div>
            <div className=" flex items-center justify-center h-full w-11/12">
          <input  className="w-full h-full  bg-gray-200 focus:outline-none text-black font-sans "></input>
            </div>
        </div>
              
                </div>
                 <div className=" w-1/3  h-full flex items-center justify-end gap-3 p-1 ">
                 <FunctionalButton heading="Write" color="blue"  onClick={()=>navigate('/WriteBlog')}/>
                 <FunctionalButton heading="🐮" color={'Green'} />
                 <FunctionalButton heading="Store" onClick={()=>{
                    navigate('/Store')
                 }} />
                 </div>
               </div>
    )
}
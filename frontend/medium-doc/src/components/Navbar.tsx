import { Heading } from "./Heading"
import { FunctionalButton } from "./ButtonsWordPlus"
interface Navbarprop{
    OnclickFunction? : ()=>void
}
export const Navbar =(props: Navbarprop)=>{
    return (
       <div>
         <div className="row-span-1 flex items-start justify-between p-1 ">
        <div  className="w-1/2 h-full flex items-center justify-start gap-2">

<Heading heading="Stories"/>


      
        </div>
         <div className=" w-1/2  h-full flex items-center justify-end gap-3 p-1 ">
         <FunctionalButton heading="Publish" color="true" onClick={props.OnclickFunction}/>
         <FunctionalButton heading="Save"  />
         </div>
       </div>
       </div>
    )
}
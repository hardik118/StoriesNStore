import { Link } from "react-router-dom"
import { ReactangelDivs } from "./ReactangularDivs"

interface UserShopCardProps{
    name: string | null
    shopname: string
    folloers?: number,
    shopDesc?: string,
    shopId: string

}
export const UserShopCard=(props: UserShopCardProps)=>{

    

    return (
       <ReactangelDivs height="52" width='56' >
       
       <div className="h-12  pl-2 w-full  flex flex-col text-left">
       <h1 className="text-md ">{props.name}</h1>
        <h1 className="text-sm  ">{props.shopname}</h1>
        </div>
        <div className="h-14 pl-2 pr-2   w-full flex flex-col">
<div className=" flex items-start justify-between">
<h1 className="text-sm">Followers</h1>
<h1 className={`text-blue-300`}>{props.folloers}</h1>
</div>




        </div>
             <div className="h-22 w-full">
                <h1 className=" pl-2 pb-2 text-sm text-left text-gray-400 ">{props.shopDesc}</h1>
                <Link to={'/UserShop'} state={props.shopId}>   <button className={`hover:scale-105 text-white font-semibold p-1 bg-gradient-to-r from-purple-500 via-blue-400  to-pink-200 w-full text-md`}>Explore</button>
                </Link>
             </div>
       </ReactangelDivs>
    )
 

}
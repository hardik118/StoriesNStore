import { ReactangelDivs } from "./ReactangularDivs"
interface Usershop{
    id : string 
    title : string
    metaInfo:  string
    Tags:string

}
export const  UserShopDocCard=(props: Usershop)=>{
const TagsArray= props.Tags.split(',');


    return <ReactangelDivs height="56" width="56" >
    <div className="h-full  w-full  flex flex-col text-left">
           <h1 className="text-md    h-10 p-3 ">{props.title}</h1>
        
           <div className="flex items-start justify-evenly h-12 p-2">
  {
    TagsArray.map((tag, index) => (
      <h1
        key={index}
        className="text-sm rounded-xl bg-gray-300 w-16 h-6 text-center"
      >
        {tag}
      </h1>
    ))
  }
</div>

                 <div className="h-full w-full flex flex-col items-start  ">
                    <h1 className=" p-2 h-4/6   text-sm text-left text-gray-400 ">{props.metaInfo}</h1>
                     <button className={`hover:scale-105 rounded-lg h-2/6 text-white font-semibold p-1 bg-gradient-to-r from-purple-500 via-blue-400  to-pink-200 w-full text-md`}>Explore</button>
                 </div>
                 </div>
    
                    </ReactangelDivs>
}
import { ReactangelDivs } from "../../components/ReactangularDivs"
import { UserShopCard } from "../../components/UserShopCard"
import { GlobalNavbar } from "../../components/NavBarGlobal"
import { DocsCard } from "../../components/doccard"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../reduxStore/Store"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { BACK_END_URL } from "../../../congif"
import { addToFeed, setFeed } from "./storeslice"
import { addShops } from "./shopslice"



export const Store=()=>{
    const dispatch= useDispatch();
    const ResourceDocs= useSelector((state: RootState)=>state.StoreReducer.Docs);
    const Shops= useSelector((state: RootState)=>state.shopReducer.Shops);
    const [page, setpage]= useState(1);
    const ResourceDocRef= useRef(null);
    const [fetching, setfetching]= useState(false);

console.log(ResourceDocs);
console.log('helllo');
console.log(Shops);
    

    useEffect(()=>{
         if(!fetching){
         setfetching(true);
   axios.get(`${BACK_END_URL}/api/v1/blog/store/Bulk?page=${page}`,{
    headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
   }).then((respoonse)=>{
    if(page==1){
        dispatch(setFeed(respoonse.data.Docs));
    }
    if(page>1){
        dispatch(addToFeed(respoonse.data.Docs));
    }
   }).finally(()=>setfetching(false));

if(Shops.length==0){
    axios.get(`${BACK_END_URL}/api/v1/blog/store/Shops/Bulk?page=1`,{
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
       }).then((response)=>dispatch(addShops(response.data.shoplist)))
}

     
}},[dispatch, page, Shops.length, fetching]);

    
     
     useEffect(()=>{
        
        const observer= new IntersectionObserver((entries)=>{
            const entry= entries[0];
            if(entry.isIntersecting && !fetching ){
               /* setpage((prevpage)=>prevpage+1);
                setfetching(true);*/
            }
        })
        if(ResourceDocRef.current){
            observer.observe(ResourceDocRef.current)
        }

        return ()=>{
            if(ResourceDocRef.current){
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ResourceDocRef.current);
            }
        }

     })



  




    return <div className="h-full w-full flex flex-col ">
        <div className="w-full border-b">
<GlobalNavbar/>
        </div>
        
        <div className="w-full h-full flex flex-row   ">


{/*Docs sectiosn */}

<div className="w-1/2 p-4  ">
<div className="w-full h-12">
<div className="flex   justify-between ">
                          <div className={`w-1/2  flex items-baseline justify-center p-1 rounded-xl bg-gradient-to-r from-purple-500 via-blue-400  to-pink-200`}>
<button className="" >For You </button>
                            </div>
                            
                          </div>
</div>
<div className="min-h-96 overflow-y-auto p-4">
    {
        ResourceDocs.map((Docs)=>(
            <ReactangelDivs height="24" width="full" >
            <DocsCard 
            name={Docs.AuhtorName}
            DocsName={Docs.ResourceName}
            DocDesc={Docs.ResourceDesc}
            DocId={Docs.ResourceId}

             >

            </DocsCard>
             </ReactangelDivs>
        ))
    }


<div> More....</div>
</div>
</div>


{/*recomendarion section*/}

<div className="w-1/2 h-full p-3  flex-col ">
<div className="h-screen w=5/6 flex flex-col  ">
<h1 className="text-lg flex flex-row border-b"><span className="text-2xl  "><pre>Our</pre></span> <span className="text-violet-500 mt-1 pl-2 "><pre>Recoomeation</pre></span></h1>

<div className="h-full w-full p-4  grid grid-cols-2 grid-row-2 gap-4">
    {
        Shops.map((shop)=>(

            <UserShopCard shopname={shop.Name}  shopDesc={shop.shopDesc} shopId={shop.ShopId} name={shop.user.name} folloers={shop.user._count.followed}  />

        ))
    }
</div>





</div>

</div>
        </div>

    </div>
}


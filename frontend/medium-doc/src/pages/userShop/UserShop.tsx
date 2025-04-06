import { UserShopDocCard } from "../../components/UserShopDocCard"
import { GlobalNavbar } from "../../components/NavBarGlobal"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../reduxStore/Store";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACK_END_URL } from "../../../congif";
import { addDocs } from "./usershopslicer";





export const UserShop=()=>{
        const dispatch= useDispatch();
        const usershopDocs= useSelector((state:RootState)=>state.userShopDocSlicer);
        const [username, setUsername]= useState('');
        const StoreId= '39b1e0af-eb48-4047-aefa-d6c654cb25be';


     useEffect(()=>{
      console.log('hu');
      axios.get(`${BACK_END_URL}/api/v1/blog/store/Shops/Docs/${StoreId}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }).then((response)=>{
        setUsername(response.data.Docs[0].Name)
        dispatch(addDocs(response.data.Docs[0].shopDoc))
      })
},[])

        



    return (
        <div className="h-screen">
          <div className="border-b">
          <GlobalNavbar/>
          </div>
          <div className="h-8 bg-gray-100 flex justify-end ">
            <h1 className="pr-8"><pre>Welcome to {username}</pre></h1>
          </div>
          <div className=" w-full bg-gray-50 flex flex-col fixed left-0">
            <div className="flex items-center justify-end mt-5">

            </div>
            <div className="overflow-y-auto min-h-screen w-full flex items-start justify-start p-4 gap-2 ">
                
                {
                  usershopDocs.Docs.map((doc)=>(
                    <UserShopDocCard  Tags={doc.Tags} id={doc.id} title={doc.title} metaInfo={doc.metaInfo}></UserShopDocCard>  

                  ))
                }  
            

            </div>
          </div>
        </div>
    )
}
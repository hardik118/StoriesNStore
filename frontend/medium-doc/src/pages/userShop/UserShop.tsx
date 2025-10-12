import { UserShopDocCard } from "../../components/UserShopDocCard"
import { GlobalNavbar } from "../../components/NavBarGlobal"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../reduxStore/Store";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACK_END_URL } from "../../../congif";
import { addDocs } from "./usershopslicer";
import { useNavigate } from "react-router-dom";





export const UserShop=()=>{
        const dispatch= useDispatch();
        const usershopDocs= useSelector((state:RootState)=>state.userShopDocSlicer);
        const [username, setUsername]= useState('');
        const userId=localStorage.getItem("userId")
        const navigate= useNavigate();
        


     useEffect(()=>{
      axios.get(`${BACK_END_URL}/api/v1/blog/store/Shops/Docs/${userId}`,{
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
         <div className="h-8  flex items-center justify-between px-2">
  {/* Left buttons */}
  <div className="flex space-x-2">
    <button onClick={()=>navigate("/buy-coffe")} className="w-32 h-8 p-1 bg-white border  border-black  rounded-full">buy A coffe </button>
    <button onClick={()=>navigate("/upload-doc")} className="w-32 h-8 p-1 bg-white border border-black rounded-full"> upload Doc</button>
  </div>

  {/* Right text */}
  <h1 className="pr-8 text-sm">
    <pre>Welcome to {username}</pre>
  </h1>
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
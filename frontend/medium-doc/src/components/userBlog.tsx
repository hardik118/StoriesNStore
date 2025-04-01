import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { BACK_END_URL } from "../../congif";

interface UserBlogProps{
    userProfile: string
    date?: string,
    tittle: string,
    content: string,
    name: string
    setNotIntrested: React.Dispatch<React.SetStateAction<string>>

}

const saveThePost= async (id: string, setmsg: React.Dispatch<React.SetStateAction<boolean>>)=>{
    
    try {
      const Res_saved=  await  axios.post(`${BACK_END_URL}/api/v1/user/updateUser/addToSave`,
            {
data:{
    postId: {id}
}
            },
            {
            headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
        
            }
        })
        if(Res_saved.status=200){
            setmsg(true);
        }
    

    } catch (error) {
        
    }


}

export const UserBlog=(props: UserBlogProps)=>{

const [msg, setmsg]= useState(false);


    const navigate= useNavigate();
    //const Avatar: String= props.userProfile.split(" ")[0] || "Ano";
    const Avatar: string="ano";
    const ContentPretty:string= props.content.length> 100 ?props.content.substring(0, 100)+"...":props.content

    return <div className=" grid  grid-cols-6 p-5 pr-3">
       <div className="  col-span-4   h-52 flex flex-col">
<div className="flex flex-row gap-1 pl-2 pt-2  text-gray-500">
<div className="h-8 w-8 rounded-xl bg-black flex items-center justify-center">
   <img src="" alt="" /> 
   
   {Avatar.substring(0,2)}
</div>
<div className="pl-2 pt-1">
    {props.name}
</div>
<div className="pl-2 pt-1">
    {props.date}
</div>

</div>
<div className="text-2xl font-medium pl-2 pr-2 pt-2">
    {props.tittle}</div>
    <div className="text-md p-2 ">
        {        <div dangerouslySetInnerHTML={{__html: ContentPretty}}/>
    }
   </div> 
    <div className="flex items-end  h-full p-2 gap-2">
     <div className="flex  justify-between bg-white w-full">
     <div className="bg-gray-300 rounded-md w-12 text-center " >
           {props.content.length <1000? "1 min" :Math.floor(props.content.length/1000)+" min" }
       </div> 
<div className="flex flex-row gap-3">
    <div className="bg-gray-200 border rounded-lg w-auto pl-1 pr-1  hover:scale-75 transition-all ease-in-out duration-200  ">
        <button onClick={()=>props.setNotIntrested(props.userProfile)}> Not</button>
    </div>
<div className=" ">
    like 
</div>
<div>
    Discourse
</div>
<div className="bg-gray-200 border rounded-lg w-auto pl-1 pr-1  hover:scale-75 hover:s transition-all ease-in-out duration-200  ">
    
    <button disabled={msg}  onClick={()=>{saveThePost(props.userProfile, setmsg) }}> {msg ? "Saved" :"Save"}</button>
</div>
</div>

        </div>  

     </div>
       </div>

     
       <div className="col-span-2 h-52 flex items-center justify-center">
       <button type="submit"   onClick={()=>{
                console.log("navigateds");
                const id=props.userProfile;
navigate('/Blog', {state: {id}})
            }}>
            <div className="bg-gray-300 rounded-md w-40 h-40">
            
        
            </div>
            </button>
        


       </div>
    </div>
}
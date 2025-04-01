import { Heading } from "../components/Heading"
import { Subheading } from "../components/SubHeading"
import { InputAndLabel } from "../components/labelAndInput"
import { Button } from "../components/button"
import { useState } from "react"
import { Anchor } from "../components/anchorCompo"
import { SigninInput } from "@hardik_05/medium-zod"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACK_END_URL } from "../../congif"
import { useCallback } from "react"
import { Msgbox } from "../components/Msgbox"

export const  Singin=()=>{
    const navigate= useNavigate();
    const [fadeOut, setFadeOut] = useState(false);
    const [postInput,setpostinput]=useState<SigninInput>({
        email: " ",
        password: " "
    })
    const [msg,setMsg]= useState("");
    const [ismsg, setismsg]= useState(false);
    const debounce=<T extends (...args: any[])=>void>(func: T, delay: number)=>{
        let timeoutId :  ReturnType<typeof setTimeout> | undefined;
        const context= this;
        
        return function(...args: Parameters<T>){
                if(timeoutId) clearTimeout(timeoutId);
                timeoutId= setTimeout(() => {
                   func.apply( context, args)     
                }, delay);
        }
        }
    const ReqSingin= async()=>{
        try {
         const Response= await axios.post(`${BACK_END_URL}/api/v1/user/Login`, postInput)
 
         const {userToken}= Response.data;
         if(!userToken){          
               setMsg(Response.data.msg);
                 setismsg(true);
                setTimeout(()=>{
 setismsg(false)
                }, 1000)            
         }else{
            setFadeOut(true);
                 localStorage.setItem('token', userToken);
                 
                 navigate("/BlogsFeed")
         }
         
        } catch (error) {
         setismsg(true);
         setMsg("Try again!");
        }
 }
 const debounceReqSignin= useCallback(debounce(ReqSingin, 300), [postInput.email, postInput.password])

 const handleSubmit=()=>{
         debounceReqSignin();
 }
    return (
       
 <div className="flex items-center justify-center h-screen "> 
                           {ismsg && <Msgbox msg={msg}/>}

 <div className="w-full">
                  <div className={`bg-white flex items-center justify-center transition-all duration-500 ${fadeOut ? 'fade-out' : ''}`}>
<div className="h-80 w-96 bg-gray-100 p-2 border rounded-md shadow-lg">
<Heading heading={"Login To Account"} align={"center"} />
<div className="flex items-center justify-center">
<Subheading heading={"Don't have an Account?"} align={"center"} />
<Anchor heading={"Singup"} link={"/Singup"}/>
</div>
<InputAndLabel heading={"email"} placeholder={"enter your email"}  onChange={(e)=>{
    setpostinput(c=>({
        ...c,
        email: e.target.value
    }))
}}/>
<InputAndLabel heading={"password"} type="password" placeholder={"enter your password"} onChange={(e)=>{
    setpostinput(c=>({
        ...c,
        password: e.target.value
    }))
}} />
<div className=" w-full p-2 flex items-center justify-center"><Button heading={"Singup"} onClick={handleSubmit} />
</div>
</div>
</div> 
       </div>
 </div>
    )

}
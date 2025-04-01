import { Heading } from "../components/Heading"
import { Subheading } from "../components/SubHeading"
import { InputAndLabel } from "../components/labelAndInput"
import { Button } from "../components/button"
import { Quotebox } from "../components/quotebox"
import { Anchor } from "../components/anchorCompo"
import { SignupInput } from "@hardik_05/medium-zod"
import { useCallback, useState } from "react"
import axios from "axios"
import {BACK_END_URL}  from "../../congif";
import { useNavigate } from "react-router-dom"
import { Msgbox } from "../components/Msgbox"

export const Singup = () => {
        const navigate= useNavigate();

        const [postInput, setpostInput]= useState<SignupInput>({
                username: " ",
                email: " ",
                password:" "
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
const ReqSingup= async()=>{
       try {
        const Response= await axios.post(`${BACK_END_URL}/api/v1/user/signup`, postInput)

        const {token}= Response.data;
        if(!token){          
              setMsg(Response.data.msg);
                setismsg(true);
               setTimeout(()=>{
setismsg(false)
               }, 2000)            
        }else{
                localStorage.setItem('token', token);
                if(localStorage.getItem('token') ){
                        navigate('/BlogsFeed');
                }
        }
        
       } catch (error) {
        setismsg(true);
        setMsg("Try again!");
       }
}
const debounceReqSignup= useCallback(debounce(ReqSingup, 300), [postInput.email, postInput.password, postInput.username])

const handleSubmit=()=>{
        debounceReqSignup();
}
        return (
        
                <div className="grid lg:grid-cols-2 md:grid-cols-1 h-screen">
                          {ismsg && <Msgbox msg={msg}/>}
                        
                        <div className="bg-white flex items-center justify-center h-screen p-2 ">
                               
                                <div className="h-96 w-96 bg-gray-100 p-2 border rounded-md lg:shadow-lg md:shadow-none ">
                                        <Heading heading={"Create An Account"} align={"center"} />
                                        <div className="flex items-start justify-center ">
                                                <Subheading heading={"Already have an Account?"} align={"center"} />
                                                <Anchor heading={"Login"} link={"/Signin"} />
                                        </div>
                                        <InputAndLabel heading={"Username"} placeholder={"enter your name"} onChange={(e)=>{
                                setpostInput(c=>({
                                        ...c,
                                        username:e.target.value
                                }))
                                        }} />
                                        <InputAndLabel heading={"email"} placeholder={"enter your email"} onChange={(e)=>{
                                                setpostInput(c=>({
                                                        ...c,
                                                        email: e.target.value
                                                }))
                                        }}/>
                                        <InputAndLabel heading={"password"} type="password" placeholder={"enter your password"} onChange={(e)=>{
                                                setpostInput(c=>({
                                                        ...c,
                                                        password: e.target.value
                                                }))
                                        }} />
                                        <div className=" w-full p-2 flex items-center justify-center"><Button onClick={handleSubmit} heading={"Singup"} />
                                        </div>
                                </div>
                        </div>
                        <div className="bg-gray-100 flex items-center justify-center  invisible lg:visible">
                                <Quotebox quote={"As we venture into the future, the integration of technology and daily life becomes increasingly apparent. Innovations are reshaping how we interact with the world around us, creating new opportunities and challenges."}
                                        heading={"Olover wild"} subheading={"cf- autn.com"} />
                        </div>
                </div>
        )
}
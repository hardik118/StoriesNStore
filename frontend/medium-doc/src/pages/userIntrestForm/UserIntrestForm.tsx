import  { useEffect, useState } from "react"
import { Button } from "../../components/button"
import { ReactangelDivs } from "../../components/ReactangularDivs"
import axios from "axios"
import { BACK_END_URL } from "../../../congif"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../reduxStore/Store"
import { addNames } from "./IntrestFormSlice"
import { EventListenerButton } from "../../components/EventListenersBtn"
import { removeName } from "./newIntrestslicer"
import { useNavigate } from "react-router-dom"
import { Msgbox } from "../../components/Msgbox"

interface Intrest{
    name: string
}
  

export const UserIntrest=()=>{
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const IntrestFormNames : Intrest[]= useSelector((state: RootState)=>state.IntrestFormReducer.names);
    const newIntrestFormNames= useSelector((state: RootState)=>state.newIntrestSlicer.names);
    const [msg, setmsg]= useState(true);



    console.log(newIntrestFormNames);


useEffect(()=>{
    axios.get(`${BACK_END_URL}/api/v1/blog/IntrestForm`, {
        headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then((response)=>dispatch(addNames(response.data.interestForm))).finally(()=>console.log(IntrestFormNames))
    
},[])

    const RemoveIntrest=(name: string)=>{
        dispatch(removeName([name]))
    }
    const SubmitIntrests=()=>{
        axios.post(`${BACK_END_URL}/api/v1/blog/IntrestForm`,newIntrestFormNames,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((response)=>setmsg(response.data.msg)).catch(()=>setmsg(false));

      if(msg){
         navigate('/BlogsFeed');
      }

    }

    return <div className="h-screen">
        {!msg && <Msgbox msg="Hey Continue Again!"></Msgbox>}
        <div className="h-12 border-b border-gray-200 flex justify-start pl-2 pt-1">
            <h1 className="text-3xl font-semibold">Stoires</h1>
        </div>
        <div className="h-5/6  flex flex-row justify-between ">
      
<div className="w-1/2 h-full  flex items-center justify-center flex-col ">
<h3 className="h-8  w-full text-md  p-1 text-center font-sans  ">Get what you enjoy the Most</h3>
<h3 className="h-8  w-full text-sm  p-1 text-center font-sans  font-semibold ">Explore , Surfe, And Ride</h3>
<div className="  overflow-y-auto w-2/3 grid  gap-2 grid-cols-3 ">
{
    newIntrestFormNames.map((name, index)=>(
        <div className="flex flex-row">
            <button
            onClick={()=>RemoveIntrest(name.toString())}
            className="flex items-center justify-center hover:bg-gray-100 hover:rounded-md h-6 w-5">x</button>
            <button key={index} className="text-sm  mr-1 mb-1 rounded-md  bg-green-200 p-1">{name.toString()}</button>
        </div>
    ))
}
</div>
    </div>        
<div className="h-full w-1/2  p-5 flex items-center justify-center">

<ReactangelDivs height='2/3' width='full' color="gray">
    {
      IntrestFormNames.map((name, index)=>(
        <>
        <EventListenerButton key={index} name={name}></EventListenerButton>
        </>
      ))  
    }
</ReactangelDivs>

</div>
        </div>
        <div className=" w-full  flex items-start justify-center">
            <Button onClick={SubmitIntrests}  heading="Continue"/>


        </div>
        

    </div>
}
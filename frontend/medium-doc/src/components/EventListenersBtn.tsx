import React, { useState } from "react"
import { useDispatch } from "react-redux";
import { appendNames } from "../pages/userIntrestForm/newIntrestslicer";

interface Intrest{
    name: string
}

interface ButtonPropsEventListener{
    name: Intrest[]
    setIntrestArray?: React.Dispatch<React.SetStateAction<string[]>>

}

export const EventListenerButton = (props: ButtonPropsEventListener)=>{
    const [click, setclick]= useState(false);

    const dispatch= useDispatch();
    const AddIntrestForm=()=>{
        dispatch(appendNames(props.name))
        setclick(true);

    }


    return <button  disabled={click}
    onClick={AddIntrestForm}
    className="w-auto h-8  bg-blue-200 rounded-md mr-1 mb-1 p-1  text-black"   >{props.name[0]}</button>
}
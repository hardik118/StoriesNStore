import { MouseEvent } from "react"
interface FunctionalEventBtn{
    heading: string
    onClick?: (e:MouseEvent<HTMLButtonElement>)=>void
    color ?: string
    border?: string 
    disabled?: boolean

}
export const  FunctionalButton=(props:FunctionalEventBtn)=>{
    return (
    <div className= {`flex items-start justify-end `} >
                    <button disabled={props.disabled}  onClick={props.onClick} className={` ${props.color ? `bg-white` : `bg-gradient-to-r from-purple-500 via-blue-400  to-pink-200`} rounded-lg  border shadow-lg w-20 p-1`}
                    > 
                        {
                            props.heading
                        }
                    </button>
</div>             
)}
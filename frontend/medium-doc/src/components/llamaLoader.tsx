import aniamationData from "./llama.json"
import Lottie from "lottie-react"
export const Llama= ()=>{
    return <div  className="fixed top-1/3 left-1/2 ">
<Lottie   animationData={aniamationData} loop={true} style={{width:'180px', height:"180px"}} />
    </div>
}

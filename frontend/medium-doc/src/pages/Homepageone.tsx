import { BigHeadings } from "../components/BigHeading"
import { Button } from "../components/button"
import { useNavigate } from "react-router-dom"

export const IntroHomepage=()=>{
const navigate= useNavigate();
  const handleSignup=()=>{
navigate("/Singup");
  }
  const handleExplore=()=>{
    document.getElementById("Explore-page")?.scrollIntoView({behavior: "smooth"})

  }
  
    return (<>
    <div className=" w-9/12 h-96 flex items-center justify-center">
  <div className="flex flex-col">
  <BigHeadings/>
  
 <div className="flex items-center justify-center">
  
 
 <Button  onClick={handleExplore}   heading="Explore"/>
 <Button onClick={handleSignup} heading="Singup"/>
 </div>
 
  </div>

    </div>
    </>
    )
}
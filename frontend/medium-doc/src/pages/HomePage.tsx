import Lottie from "lottie-react"
import { ReactangelDivs } from "../components/ReactangularDivs"
import BoxReveal from "../components/ui/box-reveal"
import  { GridPatternLinearGradient } from "../components/ui/grid-pattern"
import HeroVideoDialog from "../components/ui/hero-video-dialog"
import { IntroHomepage } from "./Homepageone"
import Files from "../../public/Files.json";
import {  DockDemo } from "../components/ui/dock"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const Homepage=()=>{
    const navigate= useNavigate();
    const[email, setemail]= useState('');
const handleUserSubscribingToMail=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setemail(e.target.value);

}
const handleUserSubssciption=()=>{

}

    return <div  className=" ">
    {/*navbar for the homepage*/}

     <div className="   font-md text-md  font-san shadow-sm bg-white ">
      <div className="grid grid-cols-2 w-full h-12 border-b  border-white" >
<div className="  col-span-1 flex flex-row w-full ">
<div className="w-3/4  pl-6 flex items-center justify-between">
    <h2 className="text-2xl font-semibold"><button>Stories</button></h2>
    <h3><button className="text-md   hover:text-purple-700 " onClick={()=>navigate('/BlogsFeed')}>Letters</button></h3>
    <h3><button className="text-md  hover:text-purple-700" onClick={()=>navigate('/Store')}>Store</button></h3>

</div>
</div>
<div className=" col-span-1 flex flex-row  justify-end">
<div  className="  w-1/3 flex items-center justify-evenly ">

  
   <h3><button className="text-md  underline hover:text-green-700" onClick={()=>navigate("/Signin")}>login</button></h3>
   <h3><button className="text-md  underline hover:text-blue-700" onClick={()=>navigate("/Singup")}>Singup</button></h3>
  
</div>
      </div>
</div>
    </div>

        {/*Intro Section  for the homepage*/}

   <div className="flex items-center justify-center border-b-white relative h-screen before:absolute before:opacity-60 before:inset-0  before:bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.1)_1px,transparent_1px)] before:bg-[size:40px_40px] ">
     
     
    <IntroHomepage/>    
    <div className="absolute bottom-0 w-full h-56 left-0 bg-gradient-to-b from-transparent to-white opacity-90 pointer-events-none"></div>



   </div>

    {/*Description part  for the homepage*/}


    <div id="Explore-page" className="h-screen  w-full flex flex-row relative">
   {/*running gradients*/}

    <div className="h-2 right-0 absolute w-24 mt-20  bg-gradient-to-r from-purple-500 via-blue-400 to-pink-200 animate-gradient-running"></div>
        <div className="w-1/2 h-screen  flex items-center justify-center ">
        <div className="h-2 w-24 mb-40  bg-gradient-to-r from-purple-500 via-blue-400 to-pink-200 animate-gradient-running">

</div>

        <div className="w-11/12 h-screen flex justify-center  flex-col gap-5 pb-36  ">
       
     <div className="h-16 w-80 rounded-lg  bg-red-300  mb-12 bg-gradient-to-r from-purple-500 transition-all ease-in-out duration-300 hover:scale-75 via-blue-400 to-pink-200 ">
     <div className="h-auto  p-3  w-auto hover:bg-white border-gray-200 border-2  rounded-lg text-black  text-2xl  text-center">
        <pre>Share To World</pre>
     </div>
</div>

        
        <ReactangelDivs color="gray" height="44" width="full">
            <div className="flex items-center justify-center flex-col  ">
                <p className="text-center w-full">Discover Resouces That are JUST made for you</p>
                <p className="text-purple-500 text-md pb-3 ">The Docs That you need to scale your professional carrer
                Or scale up from your existing job</p>
                <div className="bg-black w-11/12 h-8 text-center text-sm flex items-center justify-center rounded-lg text-white ">
                Our docs store help you get The Resources that you should have
                </div>
            </div>
        </ReactangelDivs>


        <div className="flex flex-row gap-10 w-full hover:transition-all ease-out duration-1000 ">
            <ReactangelDivs height="44" width="1/2">
            <div className="flex flex-col h-full">
                <div className="h-2/3 w-full  text-start p-2 border-b border-gray-200">
<h3 className="text-md  ml-2">Write Stories</h3>
<h4 className="text-sm text-gray-400 p-2"> Be the voice that guides the new demographic Help them build themself in their journey of life </h4>
                </div>
                <div className="h-1/3 hover:bg-gray-200 hover:h-10 hover:w-full w-full  flex items-center justify-center transition-transform ease-in-out duration-150 hover:scale-110">
<h5 className="font-sans"><button onClick={()=>navigate('/writeBlog')}>Take a look</button></h5>
                </div>
            </div>
            </ReactangelDivs>


            <ReactangelDivs height="44" width="1/2">
            <div className="flex flex-col h-full">
                <div className="h-2/3 w-full  text-start p-2 border-b border-gray-200">
<h3 className="text-md ml-2">Read Stories</h3>
<h4 className="text-sm text-gray-400 p-2"> Be the voice that guides the new demographic Help them build themself in their journey of life </h4>
                </div>
                <div className="h-1/3 w-full   hover:bg-gray-200 hover:h-10 hover:w-full  flex items-center justify-center transition-transform ease-in-out duration-150 hover:scale-110">
<h5 className="font-sans"><button className="" onClick={()=>navigate('/BlogsFeed')}>Find one for you</button></h5>
                </div>
                </div>
                </ReactangelDivs>
            </div>
        </div>



        </div>

{/*info part 2 section*/}

        <div className="w-1/2 h-screen    flex items-center justify-center ">
        <div className="w-11/12 h-screen   flex items-center   flex-col  gap-10  ">
       <div className="w-full  h-96">
       <GridPatternLinearGradient>
        <div>
            <h3>Stories</h3>
            <h4 className="text-xl text-gray-500 font-thin ">Stories help you view what is in minds of the innovators , what is their present , What are their future plannings</h4>
<h5 className="text-sm ">Read The experince and resources of all those whom you planning to work with find best from collaborations</h5>
 <h2 className="text-3xl p-2 text-purple-500">All At One Place</h2>
        </div>
       </GridPatternLinearGradient>
       </div>
        <div className="flex flex-row gap-10  w-full ">
            <ReactangelDivs textColor="black" color="gray" height="10" width="full">
                <div className="bg-gradient-to-r h-full rounded-lg flex items-center justify-center from-blue-500 via-purple-600 to-pink-400">
                    <h1 className="text-md  ">Take a look At what is waiting for you</h1>
                </div>
            </ReactangelDivs>
            </div>
        </div>


        </div>
       

        

        
    </div>
    
    {/*Info Part of navbar */}

    <ReactangelDivs height="6" width="full" black="black" textColor="white"/>
    
<div className="flex flex-row  p-10">
<div className="h-96 w-1/2 overflow-visible relative flex justify-center p-10 flex-col">
<div className=" rounded-md w-full p-6">
<HeroVideoDialog  thumbnailSrc="https://www.youtube.com/playlist?list=PLIivdWyY5sqIR88BxIK-3w14Vm-jTH1id" videoSrc="https://www.youtube.com/playlist?list=PLIivdWyY5sqIR88BxIK-3w14Vm-jTH1id"/>

</div>



    </div>
    <div className=" h-96 w-1/2 ">
<BoxReveal>
<div>
<h1 className="text-3xl text-purple-500  font-medium "><pre>Take A Look At What We Found For You</pre></h1>
<h1 className="pt-1"><pre>Stores and  Stories</pre> </h1>
<h1 className=" text-md text-gray-500 pt-4">We designed All in once super space to ace you in your ambitions,</h1>
<h1 className="text-md text-gray-500">let you discover rescoures you never new you needed</h1>
<h1 className="text-md text-gray-500 pr-9 pt-4">We have build the super space that allows you get a grip of what is happeing in industry  and what the actuals skills you would need to be in the top 1% of the population trying to excel in that skill and job</h1>
<h1 className=" pb-6 text-md text-gray-500 pt-4">With the aim of having a community of torch bearers we have built it on foundation of </h1>
<div className="flex flex-row gap-5 justify-between p-4 w-10/12">
    <button onClick={()=>navigate('/Store')} className= " transition-all duration-500 ease-in-out hover:scale-75  w-24 h-10 bg-black text-white p-1  rounded-lg">Discover</button>

</div>
</div>
    
</BoxReveal>
    </div>
</div>


<ReactangelDivs height="6" width="full" black="black" textColor="white"></ReactangelDivs>



{/*Last Desc section for the homepage  */}
  <div className="flex ">
    <div className=" h-screen w-2/3 flex flex-col p-4" >
    <div className=" w-full h-40 p-6">
        
        <ReactangelDivs height="20" width="3/4" black="black" textColor="white" >
        <div className="flex items-start justify-start flex-col p-2 ">
        <h1 className="text-xl text-white  font-semibold">Discover</h1>
        <h1 className=" text-md font-sans ">Your one super space that enables you to write your content out to the world</h1>
    </div></ReactangelDivs>
        

    </div>
    <div className=" w-full h-full flex flex-row ">
        <div className=" w-1/3   h-full flex items-center justify-center  p-6">
        <ReactangelDivs height="52" width="full">
            <Lottie animationData={Files} loop={true}/>
        </ReactangelDivs>

        </div>
        <div className="p-6 w-2/3 ">
        <ReactangelDivs height="full" width="full">
            <div className="flex items-start justify-center flex-col p-3">
                <h1 className="text-xl text-purple-500 font-semibold ">Shop</h1>
                <h1 className=" text-md pb-3 "><pre>We Have Designed Docs Market Just For You</pre></h1>
<h1 className="text-sm p-4 text-gray-400 ">We at shopes and stories enables you to commerce your resources , which you have crafted with hardwork and as the saying goes sharing is caring Commerce your hardy worked Resource </h1>
         <div className="transition-all ease-in-out duration-500 hover:scale-110 hover:bg-gray-100 w-full flex flex-row gap-5 items-center justify-center">
        <img className="w-8 h-8" src="cart.svg" alt="cart svgs"/>
        <h1><button onClick={()=>navigate('/UploadDoc')}>Uploads Now</button></h1>
            </div>  
            <h1 className=" p-4 text-sm text-gray-400 ">Not just upload them what is best about it is that you can look for resources that you need , now you can just But them but contributing a little to the Creater</h1>
            <div className="transition-all ease-in-out duration-500 hover:scale-110 hover:bg-gray-100 w-full  flex flex-row gap-5 items-center justify-center">
        <img className="w-8 h-8" src="Docs.svg" alt="cart svgs"/>
        <h1><button onClick={()=>navigate('/BlogsFeed')}>View Now</button></h1>
            </div> 
           </div>
        </ReactangelDivs>

</div>
       

    </div>
    
   

    </div>
    <div className=" h-screen w-1/3 flex items-center justify-center flex-col gap-20">
    <ReactangelDivs height="52" width="2/3" color="gray">
    <div className="flex items-start justify-center flex-col p-4">
        <h1 className="text-xl font-semibold p-3 text-purple-500 ">Find Your creators Store </h1> 
        <div className="flex flex-col gap-5 items-center justify-center w-full">
        <h1 className="h-10 w-full  bg-white flex items-center justify-center rounded-lg "><pre>Know thier Name</pre></h1>
        <h1 className="h-10 w-full bg-white flex items-center justify-center rounded-lg "><pre>Get their address</pre></h1>

        </div>
        </div></ReactangelDivs>
    <ReactangelDivs height="52" width="2/3">
    <div className="bg-gradient-to-r from-purple-500 via-blue-300 to-pink-200 w-full h-full flex items-center justify-center rounded-md flex-col">
        <h1 className="pb-3 text-md">Liking some Create get early newsletters From them </h1>
        <h1 className="h-10 w-1/2  bg-white flex items-center justify-center rounded-lg "><pre>Subscribe</pre></h1>

    </div>
    </ReactangelDivs>

<div>

</div>
    </div>
   

  </div>
  <div className=" h-screen w-full flex items-end justify-end flex-col ">
  <div className="bg-white w-full h-1/3 flex items-center justify-center flex-col">

<input onChange={handleUserSubscribingToMail} className="w-1/2 border-2 border-gray-200 rounded-lg h-14 text-center " type="text" placeholder="Email" />
<h1 className="text-sm text-gray-400 p-2 ">Subscribe to new Happenings</h1>
<button onClick={handleUserSubssciption} className=" bg-white  hover:border-white transition-all ease-out duration-500 hover:scale-75 hover:bg-gradient-to-r from-purple-300 via-blue-300 to-pink-200 h-12 w-36 rounded-xl border border-black">Get Happenings</button>
    </div>
    <div className="bg-gray-100 w-full h-2/3 flex flex-row">
    <div className="h-full w-1/4  flex items-start justify-start p-10 gap-5 text-gray-500 underline flex-col">
<h1>Products</h1>
<h1>Stories</h1>
<h1>Store</h1>
<h1>Donut</h1>
<h1>BrainRot</h1>
    </div>
    <div className="h-full w-1/4  flex items-start justify-start p-10 gap-5 text-gray-500 underline flex-col">
<h1>Products</h1>
<h1>Stories</h1>
<h1>Store</h1>
<h1>Donut</h1>
<h1>BrainRot</h1>
    </div>
    <div className="h-full w-1/4   p-10 gap-5 text-gray-500 underline flex-col">
<h1 className="text-lg text-gray-500 underline">Connect With Us</h1>
<div className=" flex items-center justify-start h-full">
<DockDemo/>
</div>

    </div>
    <div className="h-full w-1/4  flex items-end justify-end p-10 gap-5 text-gray-500 underline flex-col">
<h1>All Rights Researved 2024</h1>
    </div>
    </div>


  </div>
    </div>
}
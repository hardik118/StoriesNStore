import { UserBlog } from "../components/userBlog"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { BACK_END_URL } from "../../congif"
import { WordButton } from "../components/WordButton"
import { ProfileCard } from "../components/profileCard"
import { ShopProfileCard } from "../components/ShopProfileCard"
import { ReactangelDivs } from "../components/ReactangularDivs"
import { GlobalNavbar } from "../components/NavBarGlobal"
export const BlogFeed=()=>{
     interface userBlogType{
        author: {name: string},
        title :string,
        content: string,
        id: string


    }
   
const [page, setpage]= useState<number>(1);
const [blogs, setblogs]= useState<userBlogType[]>([]);
const [notIntrested, setNotIntrested]= useState<string>("");
const loadmoreBlogs= useRef<HTMLDivElement  | null >(null)
const [fetching,setfetching]= useState(true);

useEffect(() => {
    if (!notIntrested) return; // Prevents unnecessary updates
    console.log('new upadte');
  
    setblogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== notIntrested));
  }, [notIntrested]); // Removed `blogs` from dependencies
  

const flag=1;

    useEffect( () =>{
const PopulateFeed= async()=>{
    console.log("donee");
    console.log(flag)
if(fetching){
    console.log("backen res")
    console.log(flag+1)
    const response= await  axios.get(`${BACK_END_URL}/api/v1/blog/bulk?page=${page}`,{
        headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
    
        }
    }) 
if(response.data.blogs){
setblogs((prevBlogs) => [...prevBlogs, ...response.data.blogs]);
setfetching(false);
}
}


}
PopulateFeed();

    },[page, fetching])

useEffect(()=>{
    const observer= new IntersectionObserver((entries)=>{
        const entry= entries[0];
        if(entry.isIntersecting && !fetching){
            console.log("myfaut");
            setpage((prevpage)=>prevpage+1);
            setfetching(true);


        }

    });

    if(loadmoreBlogs.current){
        observer.observe(loadmoreBlogs.current)
    }
    
    return ()=>{
        if(loadmoreBlogs.current){
            observer.unobserve(loadmoreBlogs.current);
        }
    }
})


    return <div>
        <div className=" h-16 p-1 w-full flex flex-col border border-gray-300">
        <div>
       </div>    
       <GlobalNavbar/>  
    </div>
   
    <div className="    grid grid-cols-12">

<div className=" col-span-8  p-8 gap-8  w-full  ">
    <div className="  h-20  w-full flex items-center justify-start p-5  gap-5  border-r">
    <WordButton word="For You "/>
    <WordButton word="Subscribed"/>
    <WordButton word="Aptitude"/>
    <WordButton word="Developer"/>

    </div>
<div className="w-full pl-10 border-r">
<div className="h-screen overflow-y-auto min-h-96">
{ 
    
    blogs.map(blog=>(
        <UserBlog  key={blog.id} setNotIntrested={setNotIntrested} userProfile={blog.id} name={blog.author.name} tittle={blog.title} content={blog.content} />
    ))
    }
</div>
<div ref={loadmoreBlogs} className="text-center   text-gray-50">Loading...</div>

</div>

        

</div>
<div className=" col-span-4 pt-8   min-h-screen border-gray-300  flex items-center justify-start p-2 flex-col gap-5   scrollbar-hide">
    <div className=" shadow-lg rounded-lg bg-gradient-to-r from-purple-500 via-blue-400  to-pink-200  w-11/12 h-1/5">
<div className=" p-2 font-sans flex flex-col justify-center items-center pt-3  text-md font-medium text-white">
    <a>view the Docs ?</a>
<a href="">Read for your next Role?</a>
<a href="">Write For the world </a>
</div>
<div className="flex items-center flex-row justify-center bg-white h-1/2 gap-4 ">
    <ReactangelDivs height="10" width="40" ><h3 className="text-gray-700 text-sm font-semibold">Safe Docs viewer</h3> </ReactangelDivs>
    <ReactangelDivs height="10" width="40"><h3 className="text-gray-700 text-sm font-semibold">Explore Shops</h3></ReactangelDivs>
</div>
    </div>

    <div className="w-9/12 h-52 flex flex-col items-start justify-start gap-2 pt-2   ">
<ProfileCard/>
<ProfileCard/>
<ProfileCard/>

    </div>
    <h2 className=" text-sm text-black font-semibold">Shops That We Recommend</h2>
    <div className="w-11/12  h-52 border-2 border-white rounded-md grid grid-rows-2  bg-white p-2  ">
        <div className=" row-span-1  grid grid-cols-2 h-full   ">
        <div className="col-span-1 w-full h-full bg-gray-100 rounded-lg  border-2 border-white  flex items-center justify-center ">
<ShopProfileCard/>
        </div>
        <div className="col-span-1 w-full h-full bg-gray-100 rounded-lg flex items-center justify-center  ">
        <ShopProfileCard/>
</div>
        </div>
        <div className=" row-span-1 grid grid-cols-2 h-full  ">
        <div className="col-span-1 w-full h-full text-white bg-black  rounded-lg border-r  border-white flex items-center justify-center ">
        <ShopProfileCard/>
        

</div> <div className="col-span-1 w-full  text-white h-full bg-black rounded-lg flex items-center justify-center " >
<ShopProfileCard/>

</div>
        </div>

    </div>
<div className="w-11/12 flex flex-row gap-2  pt-5 h-12 items-center justify-between ">
<div className=" underline text-center font-md  bg-gradient-to-r from-purple-500 via-blue-400  to-pink-200 w-full h-full rounded-lg text-white">
    <a  href="">Explore the Discourse and Find the nusances</a>
</div>
</div>

</div>
    </div>
    </div>
}
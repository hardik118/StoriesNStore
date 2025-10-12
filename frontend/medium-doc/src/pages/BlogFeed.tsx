import { UserBlog } from "../components/userBlog"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { BACK_END_URL } from "../../congif"
import { WordButton } from "../components/WordButton"
import { ReactangelDivs } from "../components/ReactangularDivs"
import { GlobalNavbar } from "../components/NavBarGlobal"
import { useQuery } from "@tanstack/react-query"
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
const fetchInterest = async (): Promise<string[]> => {
  const { data } = await axios.get(`${BACK_END_URL}/api/v1/blog/userInterest`,{
     headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
    
        }
  }); // replace with your API
  return data.userInterest?.saveIntrest || [];
};

 const { data: interest, isLoading } = useQuery({
    queryKey: ["interest"],
    queryFn: fetchInterest,
    initialData: () => {
      const stored = localStorage.getItem("interest");
      return stored ? JSON.parse(stored) : undefined;
    },
  });

    return <div>
        <div className=" h-16 p-1 w-full flex flex-col border border-gray-300">
        <div>
       </div>    
       <GlobalNavbar/>  
    </div>
   
    <div className="    grid grid-cols-12">

<div className=" col-span-8  p-8 gap-8  w-full  ">
    <div className="  h-20  w-full flex items-center justify-start p-5  gap-5  border-r">
      {
        isLoading && <p>Loading...</p>
       
      }
      {
         interest?.map((item: string)=>(
        <WordButton word={item}/>

         ))
      }
   

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
    <ReactangelDivs height="10" width="60" ><h3 className="text-gray-700 text-sm font-semibold">Safe Docs viewer</h3> </ReactangelDivs>
    <ReactangelDivs height="10" width="60"><h3 className="text-gray-700 text-sm font-semibold">Explore Shops</h3></ReactangelDivs>
</div>
    </div>

<div className="w-full flex flex-row gap-4">
  {/* Card 1: Community Comments */}
  <div className="flex-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-300 rounded-xl shadow-lg p-4 flex flex-col justify-center items-start min-h-32">
    <h3 className="text-lg font-bold text-white mb-2">See what people are talking about</h3>
    <p className="text-white text-sm">Join the conversation, share your thoughts, and discover trending topics in the community.</p>
  </div>
  {/* Card 2: Resource Discovery */}
  <div className="flex-1 bg-gradient-to-r from-pink-400 via-blue-300 to-purple-400 rounded-xl shadow-lg p-4 flex flex-col justify-center items-start min-h-32">
    <h3 className="text-lg font-bold text-white mb-2">Find resources & guides</h3>
    <p className="text-white text-sm">Explore curated articles, tutorials, and tools to help you learn and grow.</p>
  </div>

    </div>
    <h2 className=" text-sm text-black font-semibold">This platform enables you to do ...</h2>
   <div className="w-11/12 h-52 border-2 border-white rounded-md grid grid-rows-2 bg-white p-4 gap-2">
  {/* Row 1 */}
  <div className="flex items-center gap-3">
    <span className="text-2xl">💡</span>
    <p className="text-gray-800 font-medium">Share your ideas and insights</p>
  </div>
  <div className="flex items-center gap-3">
    <span className="text-2xl">📝</span>
    <p className="text-gray-800 font-medium">Write and publish articles</p>
  </div>
  

  {/* Row 2 */}
  <div className="flex items-center gap-3">
    <span className="text-2xl">🚀</span>
    <p className="text-gray-800 font-medium">Showcase your projects</p>
  </div>
  <div className="flex items-center gap-3">
    <span className="text-2xl">🤝</span>
    <p className="text-gray-800 font-medium">Collaborate with other users</p>
  </div>
  <div className="flex items-center gap-3">
    <span className="text-2xl">🔔</span>
    <p className="text-gray-800 font-medium">Get notifications on updates</p>
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
import axios from "axios";
import { useEffect, useState } from "react";
import { BACK_END_URL } from "../../congif";
import { useLocation } from 'react-router-dom';
import { Heading } from "../components/Heading";
import DOMPurify from "dompurify";

interface BlogProps {
  title: string;
  content?: string;
  authorName: string;
  date?: string;
  authorDescp ?: string;
}

export const Blog = () => {
  const [blog, setBlog] = useState<BlogProps>();
  const location = useLocation();
  const { id } = location.state || {}
  const content: string  =  blog?.content || " ";
  const sanitizedContent = DOMPurify.sanitize(content, {
    ALLOWED_ATTR: ['style', 'class', 'href', 'src', 'title'], // Include 'style'
    ALLOWED_TAGS: [
      'p',
      'span',
      'h4',
      'blockquote',
      'strong',
      'br',
      'div',
      "em",
      's',
      'br',
    ],
  });
  





  useEffect(  () => {
   
    const CallBlogFromBackend = async ()=>{
      const response=  await  axios.get(`${BACK_END_URL}/api/v1/blog/blog/${id}`,{
       headers:{
           Authorization : `Bearer ${localStorage.getItem('token')}`
   
       }
   })
 
  setBlog(response.data.blog);
  console.log(blog);
   }
   CallBlogFromBackend();
  }, []);


  return (
   <div className=" grid grid-rows-12 h-auto min-h-screen w-full">
    <div className=" row-span-1 ">
    <div className=" flex  justify-between p-1 border border-gray-200   w-full ">
               <div  className="w-1/2 h-full flex items-center justify-start gap-2 -">

<Heading heading="Medium"/>




             
               </div> 
 
    
                <div className=" w-1/2 h-15  flex items-center justify-end gap-2  ">
                              
    <div  className="flex flex-row w-1/4   items-center justify-between h-full text-right gap-10">
  <div className="w-1/3  flex flex-row gap-2 ">
  <img className="h-5 w-5 " src="upVote.svg "/>
  {12}
  </div>
  <div className="w-1/3 flex flex-row gap-2">
  <img className="h-5 w-5 mt-1" src="downVote.svg"/>
{2}
  </div><div className="w-1/3 mr-5">
  <img className="h-5 w-5 " src="discourse.svg"/>

  </div>

</div>
<div className="w-1/4   flex flex-row  items-center justify-end  h-full  text-right   ">
<div className="w-1/3">
<img className="h-full w-7 " src="Write.svg"/>
  </div>
  <div className="w-1/3 h-full flex items-center justify-center">
  <img className="h-5 w-5 " src="Notificationbell.svg"/>

  </div><div className="w-1/3  h-full flex  items-centre justify-end ">
  <img className="h-full  w-9 bg-gray-200 rounded-xl" src=""></img>
  </div>
</div>
                </div>
            </div>
            
            <div></div>

    </div>
    
    <div className=" row-span-11 w-full flex items-start justify-center mt-10 ">
     <div className=" flex flex-col w-2/3 items-center justify-center">
     <div className=" h-auto min-h-5 text-2xl  w-full  text-center font-serif text-black p-5 border-r border-l font-semibold  ">
{blog?.title}
      </div>
      
      <div className=" border-l border-gray-200  h-9  mt-3  flex flex-row w-full  justify-between">
        <div className=" w-1/3 flex flex-row ">
        <div className=" w-1/4 flex items-center justify-center  ">
        <img className=" rounded-3xl   w-2/3 h-full" src="" alt="" />

</div>
<div className=" w-3/4">
<div className="h-1/2 w-full   flex flex-row items-center">
<div className="w-1/2  text-md">
hardik Yadav
</div>
<div className="w-1/2  text-blue-400  font-medium">
Follow
</div>
</div>
<div className="h-1/2 w-full text-gray-400 text-sm font-sans">
the lambord store

</div>

</div>
        </div>
        <div className=" w-1/3  text-right p-1 text-md text-gray-400  ">

  {"15 may 2015"}


        </div>
     
      </div>
      <div className=" h-auto min-h-32  p-5 text-xl w-9/12 pt-7">
        
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

      </div>
     </div>
     
   </div>
   </div>
  );
};

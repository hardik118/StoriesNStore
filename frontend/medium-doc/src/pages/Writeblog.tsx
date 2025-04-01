import { useState, useRef, useEffect, useCallback } from "react";
import { FunctionalButton } from "../components/ButtonsWordPlus";
import { Heading } from "../components/Heading";
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Msgbox } from "../components/Msgbox";
import ImageResize from 'quill-image-resize-module-react'; 

export const WriteBlog = () => {
  const [title, settitle]= useState('');
  const [content, setContent]= useState('');
  const [images, setImages]= useState([]);
  const [msg, setMsg]= useState('');
  const[is,setis]= useState(false);
  const navigate= useNavigate();
  const quillref= useRef<ReactQuill>(null);
  Quill.register('modules/imageResize', ImageResize);
  console.log(content);

  const modules = {
    toolbar: [
      // Dropdown for headers
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      // Font selection
      [{ font: [] }],
      // Text formatting
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      // Text alignment
      [{ align: [] }],
      // Lists
      [{ list: 'ordered' }, { list: 'bullet' }],
      // Indent and outdent
      [{ indent: '-1' }, { indent: '+1' }],
      // Text color and background color
      [{ color: [] }, { background: [] }],
      // Superscript and subscript
      [{ script: 'sub' }, { script: 'super' }],
      // Links and images
      ['link', 'image', 'video'],
      // Clear formatting
      ['clean'],
      
    ],
    imageResize: {
        modules: ["Resize", "DisplaySize"],
      },
  };

  const handleKeyPress=(event:any)=>{
    if(event.key=="Enter"){
       const quillRedCurrent= quillref.current;
       if(quillRedCurrent){
        const quill= quillRedCurrent?.getEditor();
        const range= quillRedCurrent.getEditorSelection();
        if(range){
            const rangeVal= range.index;
            event.preventDefault();
         quill.insertText(rangeVal, "\n", "user");
          
         
         

        }

       }


    }
    
    
  }
  

const getImgurl=  async ()=>{
    setis(true);
    const regex: RegExp  =/<img[^>]*src="([^"]*)"[^>]*>/g;
    let imgurls:string[]=[];
    let match ;
    let newContent= content;
    while((match=regex.exec(content))){
        imgurls.push(match[1]);
        
    }
    if(title){
        await axios.post("http://127.0.0.1:8787/api/v1/blog/uploadToCloudService", {imgurls},{headers :{Authorization: `Bearer ${localStorage.getItem('token')}`}}).then(Response=>{
            setImages(Response.data.Urls)
            
         }).catch(error=>setMsg(error));
    }
    let i=0;
     while(match= (regex.exec(content))){
        newContent= newContent.replace(match[0], `<img src="${images[i]}" >`);
        i++;

     }
console.log(newContent);
    await axios.post("http://127.0.0.1:8787/api/v1/blog/blog",{title: title, content: newContent},{headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}).then(()=>setMsg("Hey Your Story is pulished ")).catch(error=>setMsg("try refeshing again🐮🐮"));
     console.log(msg);
setis(false);





}

  

const formats = [
    'header', 'font', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'color', 'background', 'align',
    'script', 'link', 'image', 'video'
  ];
    


const handleTitle=(e:React.ChangeEvent<HTMLInputElement>)=>{
    settitle(e.target.value)
}



 

  
    const autoresize = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const target = e.currentTarget; // Use currentTarget for better typing
        target.style.height = 'auto'; // Reset the height
        target.style.height = `${target.scrollHeight}px`; // Set height to scrollHeight
    };

    return (
        <div className="grid grid-rows-12 h-screen ">
            
            {is && <Msgbox msg={msg}></Msgbox>}
            <div className="row-span-1 flex items-start justify-between p-1 ">
               <div  className="w-1/2 h-full flex items-center justify-start gap-2">

<Heading heading="Stories"/>


             
               </div>
                <div className=" w-1/2  h-full flex items-center justify-end gap-3 p-1 ">
                <FunctionalButton disabled={is} heading="Publish" color="blue" onClick={getImgurl}/>
                <FunctionalButton heading="Save" color={'Green'} />
                </div>
            </div>
            <div className="row-span-11 w-full grid grid-rows-12">
                <div className="row-span-2 flex items-center justify-center">
                    <input value={title} onChange={handleTitle}
                        className=" font-serif text-center h-20 w-9/12 border-b-2 focus:outline-none text-3xl pt-8 pl-4 pr-4 "
                        type="text"
                    />
                </div>
                <div className="row-span-10 flex items-start justify-center mt-2 ">
               
                <article  className=" flex items-start justify-center  w-full  ">
                <div className="text-gray-300  text-lg mt-4">
                    Start..
                 </div>
<ReactQuill formats={formats} onKeyDown={handleKeyPress} ref={quillref} modules={modules} className="text-xl w-2/3 h-auto" theme="bubble" onChange={setContent}></ReactQuill>
         
                </article>
                  
                 
                </div>
            </div>
        </div>
    );
};

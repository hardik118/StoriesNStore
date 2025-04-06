import { useState, useRef, useEffect } from "react";
import { FunctionalButton } from "../../components/ButtonsWordPlus";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.bubble.css';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { autoSaveStory, markClean, cleanStory } from "./WriteblogSlicer";
import axios from "axios";
import { BACK_END_URL } from "../../../congif";
import { RootState } from "../../reduxStore/Store";
import ConfirmationBox from "../../components/confirmationBox";
import FloatingOverlay from "../../components/editorsupport";


export const WriteBlog = () => {
  const [title, settitle]= useState('');
  const [draftId, setDraftId]= useState('');
  const [confirmaction, setConfirmation]= useState(false);
  const [editorcofirmation, seteditorcofirmation]= useState(false);


  

  const dispatch=  useDispatch();


  useEffect(()=>{
    const exsistingId= localStorage.getItem("draft-post-id");
    const title= localStorage.getItem('title');
    if(title){
      settitle(title);
    }

    if(!exsistingId){
        const newId= uuidv4();
        localStorage.setItem('draft-post-id', newId);
        dispatch(autoSaveStory({id: newId, content: ''}));

        axios.post(`${BACK_END_URL}/api/v1/blog/blog`,{
          id: newId,
          title: 'undefined',
          content: "undefined"
        },{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      ).finally(()=>console.log('done to backend '))

      setDraftId(newId);

    }else{
      const contnet= localStorage.getItem(`draft-${exsistingId}`);

      dispatch(autoSaveStory({id: exsistingId, content: contnet|| ""}));
      setDraftId(exsistingId);

    }

  },[])

  const userStoryContent= useSelector((state: RootState)=> draftId && state.writeblogSlicer[draftId] ? state.writeblogSlicer[draftId].content : "");


  useEffect(()=>{
    const interval= setInterval(async () => {
      if(!userStoryContent ) return ;

      try {
        await axios.put(`${BACK_END_URL}/api/v1/blog/blog`, {
          id: draftId,
          title: title,
          content: userStoryContent
        }, {
          headers:{
            Authorization : `Bearer ${localStorage.getItem("token")}`
          }
        });

        dispatch(markClean({id: draftId}));
        console.log('saved to db');
      } catch (error) {
        console.log('some error occured', error);
        
      }
      

      
    }, 30000);

    return ()=>clearInterval(interval);

  },[draftId, userStoryContent, dispatch]);




  const handleContentChange=(content: string)=>{
    const draftId= localStorage.getItem('draft-post-id');
    dispatch(autoSaveStory({id: draftId || "", content: content }))
    localStorage.setItem(`draft-${draftId}`, content);


  }
  
  const quillref= useRef<ReactQuill>(null);

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
      
    ]
  };

  const quillSlides = [
    {
      title: "Welcome to the Editor",
      subtitle: "Rich text editing made simple",
      content: "React Quill lets you create beautiful, formatted content. Start typing and use the toolbar to style your text.",
    },
    {
      title: "Formatting Text",
      subtitle: "Bold, Italic, Headers & More",
      content: "Use the toolbar to apply bold, italic, underline, headers, blockquotes, and other formatting options without writing any HTML.",
    },
    {
      title: "Inserting Images",
      subtitle: "Add visuals to your story",
      content: "Click the image button in the toolbar to upload or paste an image. You can embed images as base64 or replace them with URLs from S3 later.",
    },
    {
      title: "Auto-Save",
      subtitle: "Never lose your progress",
      content: "Your content is saved to local storage and the database periodically. You can safely close the tab and return later to continue writing.",
    },
    {
      title: "Publishing Your Post",
      subtitle: "Make your story live",
      content: "Once you're happy with your content, click the 'Publish' button to finalize your story and share it publicly.",
    },
    {
      title: "Preview Markdown",
      subtitle: "View the source",
      content: "We also convert your rich content into markdown in the background. This helps with backups and future export options.",
    },
  ];
  

  const handleKeyPress=(event:React.onmo)=>{
    if(event.key=="Enter"){
       const quillRedCurrent= quillref.current;
       if(quillRedCurrent){
        const quill= quillRedCurrent?.getEditor();
        const range= quillRedCurrent.getEditorSelection();
        if(range){
            const rangeVal= range.index;
            event.preventDefault();
         quill.insertText(rangeVal, "\n", "user");
          
        }} } }
  



  

const formats = [
    'header', 'font', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'color', 'background', 'align',
    'script', 'link', 'image', 'video'
  ];
    


const handleTitle=(e:React.ChangeEvent<HTMLInputElement>)=>{
  localStorage.setItem('title', e.target.value);
    settitle(e.target.value)
}



const handleSave=async ()=>{
  setConfirmation(true);
}
const saveStory=async ( )=>{

  await axios.put(`${BACK_END_URL}/api/v1/blog/blog`, {
    id: draftId,
    title: title,
    content: userStoryContent
  },{
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  localStorage.setItem(`draft-${draftId}`, "");
  localStorage.setItem("draft-post-id", "");
  dispatch(cleanStory({id: draftId}));
  console.log('saveeeeeee');
  setConfirmation(false);
}
const handleEditoInfo=()=>{
  seteditorcofirmation(true);

}

const handlePublish=()=>{

}
 

  


    return (
        <div className="grid grid-rows-12 h-screen ">
        { editorcofirmation &&  <FloatingOverlay  slides={quillSlides} ></FloatingOverlay>}
          <ConfirmationBox heading="Save the Story ! you want to later work on it." isOpen={confirmaction} onCancel={()=>setConfirmation(false)} onConfirm={saveStory}></ConfirmationBox>
            <div className="row-span-1 flex items-start justify-between p-1 ">
               <div  className="w-1/2  h-full flex items-center justify-start pl-2 gap-2">
               <h1 className="font-semibold text-3xl ">Stories</h1>
             
               </div>
                <div className=" w-1/2  h-full flex items-center justify-end gap-3 p-1 ">
                <FunctionalButton  onClick={handleEditoInfo}  heading="EditorInfo" color='gray' />

                <FunctionalButton onClick={handlePublish}  heading="Publish" color='blue' />

                <FunctionalButton onClick={handleSave} heading="Save" color='green' />
                </div>
            </div>
            <div className="row-span-11 w-full grid grid-rows-12">
                <div className="row-span-2 flex items-center justify-center">
                    <input value={title} onChange={handleTitle}
                    placeholder="Title:"
                        className="placeholder:text-left font-serif text-center h-20 w-9/12 border-b-2 focus:outline-none text-3xl pt-8 pl-4 pr-4 "
                        type="text"
                    />
                </div>
                <div className="row-span-10 flex items-start justify-center mt-2 ">
               
                <article  className=" flex items-start justify-center  w-full  ">
                <div className="text-gray-400  text-xl  mt-4">
                    Start...
                 </div>
<ReactQuill value={userStoryContent} formats={formats} onKeyDown={handleKeyPress} ref={quillref} modules={modules} className="text-xl w-2/3 h-auto" theme="bubble" onChange={handleContentChange}></ReactQuill>
         
                </article>
                  
                 
                </div>
            </div>
        </div>
    );
};



import { Button } from "../components/button"
import { InputAndLabel } from "../components/labelAndInput"
import { Navbar } from "../components/Navbar"
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { GlobalNavbar } from "../components/NavBarGlobal";


export const  UploadDoc=()=>{
    const onDrop=useCallback((acceptedFiles:File[])=>{
console.log(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return <div className="h-screen w-full flex flex-col">
        <div className="border-b">
        <GlobalNavbar/>

        </div>
        <div className="bg-gray-100 h-8 justify-end flex ">
        <h1 className="pr-8  "><pre>Welcome to Vivans Store</pre></h1>

        </div>
        <div className="h-full   flex items-center justify-center">
<div className="h-5/6 w-9/12 flex flex-row  gap-2  ">
<div className="h-full w-1/2 bg-gray-100  rounded-xl flex  items-center justify-center p-1 " >
<div className="h-full w-full bg-white rounded-xl flex items-center justify-center ">
<div
  {...getRootProps()} // Attaches all required properties to make the div a dropzone
  className={`border-dashed border-2 p-6 rounded-lg text-center h-1/2  w-1/2${
    isDragActive ? 'bg-blue-100' : 'bg-gray-50'
  }`}
>
  <input {...getInputProps()} /> {/* Hidden file input */}
  {isDragActive ? (
    <div className="bg-blue-100 h-full w-full rounded-lg flex items-center justify-center ">
        <p className="text-md w-full text-gray-400">Drop the files here...</p>
    </div> // Shown when dragging a file
  ) : (
    <div className="flex items-center justify-center flex-col">
        <p className="text-md ">Drag &  drop Your  files here, or click to select files</p> 
        <img className="w-24 h-32 opacity-20" src="UpLoadFile.svg" alt="" />
    </div>// Default text
  )}
</div>


</div>
</div>
<div className="h-full w-1/2 bg-gray-100 rounded-xl border-2 border-gray-200 flex flex-col">
<InputAndLabel placeholder="Enter The Title" heading="Title"/>
<div className="p-2">
    <h1 className="text-lg  pb-2 ">Give Info Regarding The doc</h1>
    <div
  contentEditable="true" 
  className="w-full  max-h-24  p-2  bg-white border-white min-h-20 overflow-y-auto scrollbar-hide border shadow-lg rounded-lg break-words"
  
></div>
</div>
<InputAndLabel heading="Enter Some Tags" placeholder="Enter tag with Space"/>
<div className=" h-full  p-4 flex items-center justify-center">
<Button heading="Upload"/>
</div>


</div>

</div>
        </div>
    </div>
}
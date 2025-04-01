import {SpecialZoomLevel, Viewer, Worker} from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import path from "../.././public/sample.pdf"
import { useState } from 'react';
export const DocViewer=()=>{
    const [page, setcurrentpage]= useState(1);
    const [totalpage, settotalpage]= useState(0);
    const goToPage = (pageNumber: number) => {
        const viewerContainer = document.querySelector('.rpv-core__viewer'); // Viewer container
        if (viewerContainer) {
            const goToPageEvent = new CustomEvent('pagechange', { detail: { pageNumber } });
            viewerContainer.dispatchEvent(goToPageEvent);
        }
    };
    const handlePageChange = (pageNumber: number) => {
        setcurrentpage(pageNumber);
        goToPage(pageNumber); // Notify the Viewer to change the page
    };

    return <div>
        <div className='h-20 flex flex-row justify-around  '>
            <div className=' h-full w-1/2  font-semibold font-sans text-black flex-col'>
<div className=' flex  h-10 justify-start  items-start gap-2'>
<h1 className='  text-3xl pl-2 '>Stories</h1>
<div className=' h-full flex  items-end justify-end p-1 gap-1  '>
<h1 className='text-xs opacity-80 '>By hardik yadav</h1>
<h1 className='text-xs text-gray-400 underline'>the love you fai</h1>
</div>
</div>
<div className='w-full  flex items-center justify-end'>
<div className=' h-full w-1/2  flex flex-row items-baseline justify-around pt-3 pl-3 gap-5'>
    <div className='w-1/3 '>
    <button onClick={()=>handlePageChange(Math.max(page-1,1))}
    disabled={page==1}
    >Before</button>

    </div>
    <div className='w-1/3 '>
 {page}/{totalpage}
    </div>
    <div className='w-1/3  '>
    <button onClick={()=>handlePageChange(Math.min(page+1,totalpage))}
    disabled={page==totalpage}
    >Next</button>

</div>

</div>
</div>
            </div>
            <div className='h-full w-1/2 flex flex-col p-2 '>
            <h1 className='text-md  font-semibold text-right'>Tcs code viat pdf </h1>
            <h1 className='text-sm text-gray-400 text-right'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. hic illum nesciunt adipisci repudiandae nostrum repellat. Corporis obcaecati libero atque magni, quasi vel.</h1>

            </div>

        </div>
<div className='overflow-y-auto w-full h-screen flex items-center justify-center  '>

<Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
    <Viewer fileUrl={path}
    defaultScale={SpecialZoomLevel.PageWidth}
    onDocumentLoad={(e)=>settotalpage(e.doc.numPages)}
    initialPage={page-1}
    
    />
</Worker>


</div>
 
    </div>
}
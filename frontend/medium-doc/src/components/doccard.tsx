import { Link } from "react-router-dom"

interface DocsCardType{
    name: string,
    DocsName:string,
    DocDesc: string,
    DocId: string
}


export const DocsCard=(props: DocsCardType)=>{
    
    return  <div className="w-full h-full ">
    <div className="w-full h-6 border-b flex items-center justify-between p-1">
        <h1 className="text-sm font-semibold underline"><a href="">{props.name}</a></h1>
        <h1 className="text-sm">{props.DocsName}</h1>
          
    </div>
    <div className="flex  w-full p-2">
        <p className="w-5/6 text-left">{props.DocDesc}</p>
        <Link to='/ViewDoc' state={props.DocId}><button className="w-1/6 text-blue-400 font-semibold" >View</button>
        </Link>
    </div>
    
</div>
}
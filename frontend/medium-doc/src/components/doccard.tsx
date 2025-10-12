import { Link } from "react-router-dom"

interface DocsCardType{
    name: string,
    DocsName:string,
    DocDesc: string,
    DocId: string
}



export const DocsCard = (props: DocsCardType) => {
  return (
    <div className="w-full h-30 mt-4 border rounded-lg shadow-sm bg-white">
      {/* Header */}
      <div className="w-full h-8 border-b flex items-center justify-between px-2">
        <h1 className="text-sm font-semibold underline">
          <a href="">{props.name}</a>
        </h1>
        <h1 className="text-sm">{props.DocsName}</h1>
      </div>

      {/* Content */}
      <div className="flex w-full p-3 h-[calc(100%-2rem)]">
        <p className="w-5/6 text-left overflow-hidden text-ellipsis">
          {props.DocDesc}
        </p>
        <Link to="/view-doc" 
         state={{
    docUrl: props.DocId,    // PDF, DOCX, PPTX, etc.
    title: props.name,
    author:  props.DocsName,
    desc: props.DocDesc,
  }}

        >
          <button className="w-1/6 text-blue-500 font-semibold hover:underline">
            View
          </button>
        </Link>
      </div>
    </div>
  );
};


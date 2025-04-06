import { MouseEvent } from "react"
interface FunctionalEventBtn{
    heading: string
    onClick?: (e:MouseEvent<HTMLButtonElement>)=>void
    color ?: string
    border?: string 
    disabled?: boolean

}
const colorMap: Record<string, string> = {
    red: "bg-red-300",
    blue: "bg-blue-300",
    green: "bg-green-300",
    gray: "bg-gray-300",
    // Add more as needed
  };
  
  export const FunctionalButton = (props: FunctionalEventBtn) => {
    const bgColorClass = props.color ? colorMap[props.color] || "bg-gray-300" : "bg-gray-300";
    return (
      <div className="flex items-start justify-end">
        <button
          disabled={props.disabled}
          onClick={props.onClick}
          className={`${bgColorClass} rounded-lg border shadow-md w-24 p-1`}
        >
          {props.heading}
        </button>
      </div>
    );
  };
  
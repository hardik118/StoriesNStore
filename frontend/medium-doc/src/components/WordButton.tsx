interface WordButtonProps{
word:string
}
export const WordButton=(props:WordButtonProps)=>{
    return <div className="mr-2 text-md text-gray-400 h-20S w-auto hover:text-blue-600 transition duration-300 ">
       <button   > {props.word}</button>
    </div>
}
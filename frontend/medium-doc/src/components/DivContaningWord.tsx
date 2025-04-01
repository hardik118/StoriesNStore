interface DivWord {
heading: string,
color?: string
}
export const  DivWord=(props: DivWord)=>{
    return <div>
            <div className={`h-8 w-8 rounded-xl bg-${props.color}-700 flex items-center justify-center text-white`}>
   <img src="" alt="" /> 
   {props.heading}
</div>
                </div>
        
}
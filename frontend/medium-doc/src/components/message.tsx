
interface MessageProps{
    heading: string
}
export const Message=(props:MessageProps)=>{
return <div >
{props.heading}
</div>
}
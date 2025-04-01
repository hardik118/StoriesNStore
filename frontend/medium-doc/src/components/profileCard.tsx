
interface ProfileCardPorps{
    imgurl?: string,
    profileInfo?: string,
    profileName?: string,
    profileId?: string ,
    addToFollwinf?: ()=>any

}
export const ProfileCard=(props: ProfileCardPorps)=>{
    return <div className=" h-14 w-full  grid grid-cols-6  ">
        <div className=" col-span-1 border-2  h-12 w-12 rounded-full ">
<img src="" alt="" />
        </div>
        <div className=" col-span-4 pl-1 ">
           <div className="text-md font-semibold font-sans text-gray-700">name</div>
           <div className="text-sm font-sans underline text-gray-500">info wouldl be somewthing h</div>

        </div>
        <div className=" col-span-1  pt-2 ">
<button  onClick={props.addToFollwinf} className="bg-white border-gray-500 rounded-lg w-11/12 h-8 text-sm font-medium hover:scale-110 text-pink-300">Follow</button>
        </div>

    
    </div>
}
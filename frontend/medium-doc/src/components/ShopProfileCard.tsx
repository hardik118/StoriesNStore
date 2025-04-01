 interface ShopProfileCard{
ShopName?: string,
address?: string,
ShopInfo?: string,
textDesign?: string
}
export const ShopProfileCard=(props: ShopProfileCard)=>{
    return <div className="flex flex-col items-center justify-center transition-transform ease-in duration-75 hover:scale-110 ">
<h2 className={`text-md font-medium font-sans`}>name</h2>
<h5 className="text-sm text-gray-500 font-sans h-1/2 ">info info </h5>
<a href="" className="text-blue-500  underline">link</a>
    </div>
}
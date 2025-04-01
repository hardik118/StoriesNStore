import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface  user {
    name:  string  | null,
    _count: {
        followed: number
    }
}

interface Shop{
    Name: string
    shopDesc: string,
    ShopId: string,
    user: user
}

interface ShopState{
    Shops: Shop[]
}

const initialState: ShopState={
    Shops: []
}

const shopSlicer=  createSlice({
    name: 'Shop',
    initialState,
    reducers :{
        addShops: (state: ShopState, action: PayloadAction<Shop[]>)=>{
            state.Shops= action.payload

        }
    }

})

export const {addShops}= shopSlicer.actions;
export default shopSlicer.reducer;


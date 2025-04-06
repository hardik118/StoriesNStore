import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Usershop{
    id : string 
    title : string
    metaInfo:  string
    Tags:string

}
interface UsershopState{
    Docs: Usershop[]
}

const initialState: UsershopState={
    Docs: []
}

const UsershopDocsSlicer=  createSlice({
    name: 'usershopdocslicer',
    initialState,
    reducers:{
        addDocs: (state, action:PayloadAction<Usershop[]>)=>{
            state.Docs= action.payload;
        },
        appendDocs:(state,action:PayloadAction<Usershop[]>)=>{
            state.Docs.push(...action.payload);
        }
    }
})

export const {addDocs, appendDocs}= UsershopDocsSlicer.actions;
export default UsershopDocsSlicer.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Intrest{
    name: string
}

interface IntrestForm{
    names: Intrest[]
}

const initialState: IntrestForm={
    names: []
}

const IntrestSlicer= createSlice({
    name: 'IntrestForm',
    initialState,
    reducers:{
        addNames: (state: IntrestForm, action: PayloadAction<Intrest[]>)=>{
            state.names= action.payload
        }
    }
})

export const {addNames} = IntrestSlicer.actions;
export default IntrestSlicer.reducer;

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

const newIntrestSlicer= createSlice({
    name: 'NewIntresList',
    initialState,
    reducers:{
        appendNames: (state: IntrestForm, action: PayloadAction<Intrest[]>)=>{
            state.names.push(...action.payload)
        }
    }
})

export const {appendNames} = newIntrestSlicer.actions;
export default newIntrestSlicer.reducer;

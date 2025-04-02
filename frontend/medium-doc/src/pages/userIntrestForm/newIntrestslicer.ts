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
        },
        removeName: (state, action: PayloadAction<string[]>) => {
            const removeSet = new Set(action.payload);
            state.names = state.names.filter(intrest => !removeSet.has(intrest.toString()));
        }
        
        
    }
})

export const {appendNames, removeName} = newIntrestSlicer.actions;
export default newIntrestSlicer.reducer;

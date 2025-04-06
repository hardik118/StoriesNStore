import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface storypost{
    content: string
    lastUpdated:  number
    isdirty: boolean
}

interface StoryEditable{
    [storyId: string] : storypost
}

const initialState: StoryEditable={}

const writeStorySlcier= createSlice({
    name: 'StoryEdtiable',
    initialState,
    reducers:{
        autoSaveStory: (state, action: PayloadAction<{id: string, content: string}>)=>{
            const {id, content}= action.payload;
            state[id]={
                content,
                isdirty: true,
                lastUpdated: Date.now()
            };
            console.log(action.payload);

        },
        markClean: (state, action:PayloadAction<{id: string}> )=>{
            const {id}= action.payload;
            if(state[id]) state[id].isdirty= false
        },
        cleanStory: ( state, action: PayloadAction<{id: string}>)=>{
            const {id}= action.payload;
            delete state[id];
        }
    }
})

export const {markClean, autoSaveStory, cleanStory}= writeStorySlcier.actions;
export default  writeStorySlcier.reducer;



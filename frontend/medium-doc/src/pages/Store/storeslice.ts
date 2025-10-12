import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface  ResourcesDocs{
    title: string,
    Tags: string,
    metaInfo: string,
    DocLink: string,

}

interface ResourceFeedState{
    Docs: ResourcesDocs[],
}

const   initialState: ResourceFeedState= {
    Docs: []
}

const ResourceDocsSlice= createSlice({
    name: 'ResourceDocs',
    initialState,
     reducers:{
        setFeed: (state: ResourceFeedState, action: PayloadAction<ResourcesDocs[]>)=>{
            state.Docs= action.payload;

        },
        addToFeed: (state: ResourceFeedState, action: PayloadAction<ResourcesDocs[]>)=>{
            state.Docs.push(...action.payload);

        }
     }
    
})

export const {setFeed, addToFeed}= ResourceDocsSlice.actions;
export  default ResourceDocsSlice.reducer;

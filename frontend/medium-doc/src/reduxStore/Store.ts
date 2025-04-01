import {configureStore} from  '@reduxjs/toolkit';
import ResourceDocReduer from "../pages/Store/storeslice";
import shopRedducer from "../pages/Store/shopslice";
import intrestFormReducer from "../pages/userIntrestForm/IntrestFormSlice";
import newIntrestSlicer from "../pages/userIntrestForm/newIntrestslicer";



export const Store = configureStore({
    reducer :{
        StoreReducer: ResourceDocReduer,
        shopReducer: shopRedducer,
        IntrestFormReducer: intrestFormReducer,
        newIntrestSlicer: newIntrestSlicer
    }
})

export type RootState = ReturnType<typeof Store.getState>;
export const AppDispatch= typeof Store.dispatch;

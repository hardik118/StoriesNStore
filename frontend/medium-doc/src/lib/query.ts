
import { QueryCache, QueryClient } from "@tanstack/react-query";


export const query = new QueryClient({
    queryCache: new QueryCache({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: (query: any)=>{
            if(query.queryKey[0]=="interest"){
                localStorage.setItem("interest", JSON.stringify(query.state.data));
            }
        }
    }),
   defaultOptions:{
    queries:{
        retry:1,
        staleTime: Infinity
    }
   }
})



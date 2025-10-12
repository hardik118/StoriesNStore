import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { Store } from './reduxStore/Store.ts';
import {  QueryClientProvider } from '@tanstack/react-query';
import { query } from "./lib/query.ts";
import { Toaster } from 'react-hot-toast'  // <-- import Toaster here


createRoot(document.getElementById('root')!).render(
   <QueryClientProvider client={query}>
     <Provider store={Store}>
            <Toaster position="top-right" reverseOrder={false} />

 <App />
    </Provider>
   </QueryClientProvider>
  
   
)

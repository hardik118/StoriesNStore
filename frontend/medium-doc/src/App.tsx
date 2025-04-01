import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Singin } from "./pages/Singin";
import { Singup } from "./pages/Singup";
import { Blog } from "./pages/Blog";
import { BlogFeed } from "./pages/BlogFeed";
import { WriteBlog } from "./pages/Writeblog";
import Document  from "./pages/Document";
import { Homepage } from "./pages/HomePage";
import { UserShop } from "./pages/UserShop";
import { DocViewer } from "./pages/DocViewer";
import { UploadDoc } from "./pages/UploadDoc";

import './App.css' 
import { Store } from "./pages/Store/Store";
import { UserIntrest } from "./pages/userIntrestForm/UserIntrestForm";

 export default function App() {
return <BrowserRouter>
<Routes>
  <Route path="/" element={<Homepage/>}></Route>
  <Route path="/Singup" element={<Singup/>}></Route>
  <Route path="/Signin" element={<Singin/>}></Route>
  <Route path="/blog" element={<Blog/>}></Route>
  <Route path="/BlogsFeed" element={<BlogFeed/>}></Route>
  <Route path="/Writeblog" element={<WriteBlog/>}></Route>
  <Route path='/BuyADonut' element={<Document/>}></Route>
  <Route path='/Store' element={<Store/>}></Route>
  <Route path="/UserIntrestForm" element={<UserIntrest/>}></Route>
  <Route path="/UserShop" element={<UserShop/>}></Route>
  <Route path="/ViewDoc" element={<DocViewer/>}></Route>
  <Route path="/UploadDoc" element={<UploadDoc/>}></Route>
  


</Routes>
</BrowserRouter>

}
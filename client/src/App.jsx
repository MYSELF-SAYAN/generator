
import "../src/App.css"
import ColorCodeGenerator from "./Components/ColorCodeGenerator.jsx";
import SqlGen from "./Pages/SqlGen.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import { Route,Routes } from "react-router-dom";
import {useSelector} from "react-redux"
const App = () => {
   const user = useSelector(state => state.auth.isAuth)
  //const user=true
  return (
    <div>
   <Routes>
    <Route path="/" element={user?<Home/>:<Login/>}/>
    <Route path="/palette" element={user?<ColorCodeGenerator/>:<Login/>}/>
    <Route path="/sql" element={user?<SqlGen/>:<Login/>}/>
    <Route path="/login" element={user?<Home/>:<Login/>}/>
    <Route path="/signup" element={user?<Home/>:<Signup/>}/>
   </Routes>
      
    </div>
  );
};

export default App;

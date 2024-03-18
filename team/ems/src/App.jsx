import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import DashBoard from "./pages/DashBoard"
import CreateEmployee from "./pages/CreateEmployee"
import EmployeeList from "./pages/EmployeeList"
import EditEmployee from "./pages/EditEmployee"
function App() {
 

  return (
   <>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/dashboard" element={<DashBoard />}/>
        <Route path="/elist/create" element={<CreateEmployee />}/>
        <Route path="/edit/:id" element={<EditEmployee />}/>
        <Route path="/elist" element={<EmployeeList />}/>
      </Routes> 
   </BrowserRouter>
   </>
  )
}

export default App

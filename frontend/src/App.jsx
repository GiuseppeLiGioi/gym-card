import {BrowserRouter, Routes, Route} from "react-router-dom"
import AuthenticationPage from "./assets/Pages/AuthenticationPage"
import HomePage from "./assets/Pages/HomePage"
import ProgressPage from "./assets/Pages/ProgressPage"
import SingleSheetPage from "./assets/Pages/SingleSheetPage"
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<AuthenticationPage />}/>
      <Route path="/home" element={<HomePage />}/>
      <Route path="/sheet/:sheetId" element={<SingleSheetPage />}/>
      <Route path="/sheet/:sheetId/progress" element={<ProgressPage />}/>
    </Routes>
    </BrowserRouter>
   
    </>
  )
}

export default App

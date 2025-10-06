import {BrowserRouter, Routes, Route} from "react-router-dom"
import { GlobalProvider } from "./assets/contexts/GlobalContext"
import { ToastContainer } from "react-toastify"
import ProtectedRoute from "./assets/Components/ProtectedRoute"
import AuthenticationPage from "./assets/Pages/AuthenticationPage"
import HomePage from "./assets/Pages/HomePage"
import ProgressPage from "./assets/Pages/ProgressPage"
import SingleSheetPage from "./assets/Pages/SingleSheetPage"
function App() {
  

  return (
    <>
    <BrowserRouter>
    <GlobalProvider> 
      <ToastContainer />
    <Routes>

      
      <Route path="/login" element={
        <ProtectedRoute>
          <AuthenticationPage />
        </ProtectedRoute>     
        }/>

      <Route path="/home" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>  
        }/>

      <Route path="/sheet/:sheetId" element={
        <ProtectedRoute>
          <SingleSheetPage />
        </ProtectedRoute>
       }/>

      <Route path="/sheet/:sheetId/progress" element={
        <ProtectedRoute>
          <ProgressPage />
        </ProtectedRoute>
        }/>


    </Routes>
    </GlobalProvider>    
    </BrowserRouter>
   
    </>
  )
}

export default App

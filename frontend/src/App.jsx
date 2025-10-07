import {BrowserRouter, Routes, Route} from "react-router-dom"
import { GlobalProvider } from "./assets/contexts/GlobalContext"
import { ToastContainer } from "react-toastify"
import ProtectedRoute from "./assets/Components/ProtectedRoute"
import AuthenticationPage from "./assets/Pages/AuthenticationPage"
import HomePage from "./assets/Pages/HomePage"
import ProgressPage from "./assets/Pages/ProgressPage"
import SingleSheetPage from "./assets/Pages/SingleSheetPage"
import Header from "./assets/Components/Header"
import PlansPage from "./assets/Pages/PlansPage"
import CoursesPage from "./assets/Pages/CoursesPage"
function App() {
  

  return (
    <>
    <BrowserRouter>
    <GlobalProvider> 
         <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          backgroundColor: "#1e1e2f",
          color: "white",
          fontWeight: "600",
          padding: "16px 24px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          textAlign: "center",
          minWidth: "250px",
          maxWidth: "90%",
        }}
        toastStyle={{ backgroundColor: "#1e1e2f", color: "white" }}
      />
      <Header />
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

        <Route path="/courses" element={
        <ProtectedRoute>
          <CoursesPage />
        </ProtectedRoute>  
        }/>

         <Route path="/plans" element={
        <ProtectedRoute>
          <PlansPage />
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

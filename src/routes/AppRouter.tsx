import { Navigate, Route, Routes } from "react-router"
import ScreenHome from "../components/screens/ScreenHome/ScreenHome"
import ScreenProductPage from "../components/screens/ScreenProductPage/ScreenProductPage"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home"/>}/>
      <Route path="/home" element={<ScreenHome/>}/>
      <Route path="/product/:id" element={<ScreenProductPage/>}/>
      
    </Routes>
  )
}

export default AppRouter

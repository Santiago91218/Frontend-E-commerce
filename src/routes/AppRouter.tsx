import { Navigate, Route, Routes } from "react-router"
import ScreenHome from "../components/screens/ScreenHome/ScreenHome"
import ScreenProductPage from "../components/screens/ScreenProductPage/ScreenProductPage"
import ScreenMen from "../components/screens/ScreenCategories/ScreenMen/ScreenMen"
import ScreenWomen from "../components/screens/ScreenCategories/ScreenWomen/ScreenWomen"
import ScreenKids from "../components/screens/ScreenCategories/ScreenKids/ScreenKids"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home"/>}/>
      <Route path="/home" element={<ScreenHome/>}/>
      <Route path="/product/:id" element={<ScreenProductPage/>}/>
      <Route path="/hombre" element={<ScreenMen/>}/>
      <Route path="/mujer" element={<ScreenWomen/>}/>
      <Route path="/nino-a" element={<ScreenKids/>}/>
      
    </Routes>
  )
}

export default AppRouter

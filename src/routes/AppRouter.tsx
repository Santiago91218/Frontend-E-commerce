import { Navigate, Route, Routes } from "react-router"
import ScreenHome from "../components/screens/ScreenHome/ScreenHome"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home"/>}/>
      <Route path="/home" element={<ScreenHome/>}/>
      
    </Routes>
  )
}

export default AppRouter

import { Navigate, Route, Routes, useLocation } from "react-router";
import ScreenHome from "../components/screens/ScreenHome/ScreenHome";
import ScreenProductPage from "../components/screens/ScreenProductPage/ScreenProductPage";
import ScreenMen from "../components/screens/ScreenCategories/ScreenMen/ScreenMen";
import ScreenWomen from "../components/screens/ScreenCategories/ScreenWomen/ScreenWomen";
import ScreenKids from "../components/screens/ScreenCategories/ScreenKids/ScreenKids";
import ScreenLoginSignup from "../components/screens/ScreenLoginSignup/ScreenLoginSignup";
import { ScreenCart } from "../components/screens/ScreenCart/ScreenCart";
import ScreenAdmin from "../components/screens/ScreenAdmin/ScreenAdmin";
import { ScreenUser } from "../components/screens/ScreenUser/ScreenUser";
import { ScreenDestacados } from "../components/screens/ScreenCategories/ScreenDestacados/ScreenDestacados";

const AppRouter = () => {
	const userLogueado = localStorage.getItem("token");

	const location = useLocation();
	const isLoginPath = location.pathname === "/login";

	if (!userLogueado && !isLoginPath) {
		return (
			<Navigate
				to="/login"
				replace
			/>
		);
	}

	return (
		<Routes>
			<Route
				path="/"
				element={<Navigate to="home" />}
			/>
			<Route
				path="/home"
				element={<ScreenHome />}
			/>
			<Route
				path="/login"
				element={<ScreenLoginSignup />}
			/>
			<Route
				path="/user"
				element={<ScreenUser />}
			/>
			<Route
				path="/product/:id"
				element={<ScreenProductPage />}
			/>
			<Route
				path="/admin"
				element={<ScreenAdmin />}
			/>
			<Route
				path="/hombre"
				element={<ScreenMen />}
			/>
			<Route
				path="/mujer"
				element={<ScreenWomen />}
			/>
			<Route
				path="/nino-a"
				element={<ScreenKids />}
			/>
			<Route
				path="/destacados"
				element={<ScreenDestacados />}
			/>
			<Route
				path="/cart"
				element={<ScreenCart />}
			/>
		</Routes>
	);
};

export default AppRouter;

import { BrowserRouter } from "react-router";
import AppRouter from "./routes/AppRouter";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";

function App() {
	const loadFromStorage = useAuthStore((state) => state.loadFromStorage);

	useEffect(() => {
		loadFromStorage();
		console.log("Usuario cargado:", useAuthStore.getState().usuario);
	}, []);

	return (
		<>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</>
	);
}

export default App;

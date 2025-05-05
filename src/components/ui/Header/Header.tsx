import { ShoppingCart, User } from "lucide-react";
import styles from "./Header.module.css";
import logo from "../../assets/Logo.png";
import { useNavigate } from "react-router";

const Header = () => {
	const navigate = useNavigate();
	const handleNavigate = (category: string) => {
		navigate(`/${category}`);
	};
	return (
		<>
			<div className={styles.headerContainer}>
				<div
					onClick={() => handleNavigate("home")}
					className={styles.logo}
				>
					<img
						src={logo}
						alt=""
					/>
				</div>
				<div className={styles.navContainer}>
					<div onClick={() => handleNavigate("hombre")}>
						<p>Hombres</p>
					</div>
					<div onClick={() => handleNavigate("mujer")}>
						<p>Mujeres</p>
					</div>
					<div onClick={() => handleNavigate("nino-a")}>
						<p>Niños</p>
					</div>
					<div>
						<p>Destacados</p>
					</div>
				</div>
				<div className={styles.iconsContainer}>
					<div onClick={() => handleNavigate("cart")}>
						<ShoppingCart size={32} />
					</div>
					<div>
						<User size={32} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;

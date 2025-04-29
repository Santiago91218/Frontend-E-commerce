import { ShoppingCart, User } from "lucide-react";
import styles from "./Header.module.css";
import logo from "../../assets/Logo.png"
import { useNavigate } from "react-router";

const Header = () => {

  const navigate = useNavigate();
  const handleNavigate= () => {
    navigate(`/home`);
  };
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.logo}><img src={logo} alt="" /></div>
        <div className={styles.navContainer}>
          <div onClick={handleNavigate}>
            <p>Inicio</p>
          </div>
          <div>
            <p>Hombres</p>
          </div>
          <div>
            <p>Mujeres</p>
          </div>
          <div>
            <p>Niños</p>
          </div>
          <div><p>Destacados</p></div>
        </div>
        <div className={styles.iconsContainer}>
          <div>
            <ShoppingCart size={32}/>
          </div>
          <div>
            <User size={32}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

import { Facebook, Instagram, Twitter } from "lucide-react";
import logo from "../../assets/Logo.png";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerInfo}>
            <p>Argentina, Mendoza</p>
            <p>Contacto: lookz.@gmail.com</p>
            <p>Teléfono: 542615678910</p>
          </div>

          <div className={styles.footerLogo}>
            <img src={logo} alt="Logo Lookz" />
          </div>

          <div className={styles.footerSocials}>
            <Instagram />
            <Twitter />
            <Facebook />
          </div>
        </div>

        <div className={styles.footerCopy}>
          © 2025 Lookz. Todos los derechos reservados.
        </div>
      </footer>
    </>
  );
};

export default Footer;

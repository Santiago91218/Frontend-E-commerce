import Header from "../../../ui/Header/Header";
import Footer from "../../../ui/Footer/Footer";
import styles from "./ScreenMen.module.css";
import CardProducts from "../../../ui/Cards/CardProducts/CardProducts";
import SidebarFilter from "../../../ui/SidebarFilter/SidebarFilter";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ServiceDetalle } from "../../../../services/serviceDetalle";
import { IDetalleDTO } from "../../../../types/detalles/IDetalleDTO";

const ScreenMen = () => {
  const [productosHombre, setProductosHombre] = useState<IDetalleDTO[] | any>(
    []
  );
  const detalleService = new ServiceDetalle();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const productosHombre = await detalleService.getDetallesGeneroProduct(
      "MASCULINO"
    );

    setProductosHombre(productosHombre);
  };

  return (
    <>
      <div className={styles.screenMen}>
        <Header />

        <div className={styles.bannerImages}>
          <img
            src="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/a005c6ee-8d75-4115-a42c-6bdd89239a09/zapatillas-ropa-y-accesorios-nike-para-hombre.jpg"
            alt=""
          />
          <img
            src="https://imgmedia.larepublica.pe/640x640/larepublica/original/2024/11/22/6740fd797891720ab81487d8.webp"
            alt=""
          />
          <img
            src="https://nikearprod.vtexassets.com/assets/vtex.file-manager-graphql/images/5d225ba6-7e2e-4b24-87d9-988a28290263___07adcb35a4533ee56ef1b5f0aa7a262f.jpg"
            alt=""
          />
        </div>

        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
            <SidebarFilter />
          </div>
          <div className={styles.productsSection}>
            <div className={styles.searchBar}>
              <input type="search" placeholder="Buscar producto" />
              <Search />
            </div>
            <div className={styles.productCards}>
              <CardProducts products={productosHombre} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ScreenMen;

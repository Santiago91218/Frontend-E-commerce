import Header from "../../../ui/Header/Header";
import Footer from "../../../ui/Footer/Footer";
import styles from "./ScreenWomen.module.css";
import CardProducts from "../../../ui/Cards/CardProducts/CardProducts";
import SidebarFilter from "../../../ui/SidebarFilter/SidebarFilter";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { IDetalleDTO } from "../../../../types/detalles/IDetalleDTO";
import { ServiceDetalle } from "../../../../services/serviceDetalle";

const ScreenWomen = () => {
  const [productosMujer, setProductosMujer] = useState<IDetalleDTO[] | any>([]);
  const detalleService = new ServiceDetalle();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const prodcutosMujer = await detalleService.getDetallesGeneroProduct(
      "FEMENINO"
    );

    setProductosMujer(prodcutosMujer);
  };
  return (
    <>
      <div className={styles.screenWomen}>
        <Header />

        <div className={styles.bannerImages}>
          <img
            src="https://nikearprod.vtexassets.com/arquivos/ids/1336341-1000-1000?v=638730634456330000&width=1000&height=1000&aspect=true"
            alt=""
          />
          <img
            src="https://nikearprod.vtexassets.com/arquivos/ids/1265747-1000-1000?v=638697032679300000&width=1000&height=1000&aspect=true"
            alt=""
          />
          <img
            src="https://nikearprod.vtexassets.com/arquivos/ids/1291643-1000-1000?v=638723801035300000&width=1000&height=1000&aspect=true"
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
              {productosMujer.map((producto: IDetalleDTO) => (
                <CardProducts key={producto.id} products={producto} />
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ScreenWomen;

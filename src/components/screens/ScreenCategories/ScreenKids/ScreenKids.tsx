import Header from "../../../ui/Header/Header";
import Footer from "../../../ui/Footer/Footer";
import styles from "./ScreenKids.module.css";
import CardProducts from "../../../ui/Cards/CardProducts/CardProducts";
import SidebarFilter from "../../../ui/SidebarFilter/SidebarFilter";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { IDetalleDTO } from "../../../../types/detalles/IDetalleDTO";
import { ServiceDetalle } from "../../../../services/serviceDetalle";

const ScreenKids = () => {
  const [productosInfantil, setProductosInfantil] = useState<
    IDetalleDTO[] | any
  >([]);
  const detalleService = new ServiceDetalle();
  const [inputText, setInputText] = useState<string>("");

  const productosFiltrados = productosInfantil.filter((producto: IDetalleDTO) =>
    producto.producto.nombre.toLowerCase().includes(inputText.toLowerCase())
  );

  const handleChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const productosInfantil = await detalleService.getDetallesGeneroProduct(
      "INFANTIL"
    );
    setProductosInfantil(productosInfantil);
  };

  return (
    <>
      <div className={styles.screenKids}>
        <Header />

        <div className={styles.bannerImages}>
          <img
            src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_1110,c_limit/17783f55-98a7-4483-b0eb-c3a44d2261b4/el-mejor-calzado-nike-para-ni%C3%B1os.jpg"
            alt=""
          />
          <img
            src="https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/494ab9f8-072f-49f7-a2c7-05772993c1a2/nike-para-ni%C3%B1os.jpg"
            alt=""
          />
          <img
            src="https://static.nike.com/a/images/f_auto/dpr_3.0,cs_srgb/h_484,c_limit/4906ab21-937a-4a9a-997a-ae95ec24bd70/los-mejores-calcetines-de-nike-para-ni%C3%B1os.jpg"
            alt=""
          />
        </div>

        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
            <SidebarFilter />
          </div>
          <div className={styles.productsSection}>
            <div className={styles.searchBar}>
              <input
                onChange={handleChangeInputSearch}
                value={inputText}
                type="search"
                placeholder="Buscar producto"
              />
              <Search />
            </div>
            <div className={styles.productCards}>
              {productosFiltrados.map((producto: IDetalleDTO) => (
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

export default ScreenKids;

import { Search } from "lucide-react";
import Header from "../../../ui/Header/Header";
import SidebarFilter from "../../../ui/SidebarFilter/SidebarFilter";
import styles from "./ScreenDestacados.module.css";
import CardProducts from "../../../ui/Cards/CardProducts/CardProducts";
import Footer from "../../../ui/Footer/Footer";
import { ServiceDetalle } from "../../../../services/serviceDetalle";
import { useEffect, useState } from "react";
import { IDetalleDTO } from "../../../../types/detalles/IDetalleDTO";

export const ScreenDestacados = () => {
     const [productosDestacados, setProductosDestacados] = useState<IDetalleDTO[] | any>(
        []
      );
      const [inputText, setInputText] = useState<string>("");
      const detalleService = new ServiceDetalle();
    
      const productosFiltrados = productosDestacados.filter((producto: IDetalleDTO) =>
        producto.producto.nombre.toLowerCase().includes(inputText.toLowerCase())
      );
    
      const handleChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
      };

      const getProducts = async () => {
        const productosDestacados = await detalleService.getProductosDestacados()
        setProductosDestacados(productosDestacados);
      };
    
      useEffect(() => {
        getProducts();
      }, []);
  return  <>
      <div className={styles.screenDestacados}>
        <Header />

        <div className={styles.mainContent}>
          <div className={styles.sidebar}>
            <SidebarFilter />
          </div>
          <div className={styles.productsSection}>
            <div className={styles.searchBar}>
              <input
                value={inputText}
                onChange={handleChangeInputSearch}
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
};

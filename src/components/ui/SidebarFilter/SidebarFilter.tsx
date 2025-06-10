import { useEffect, useState } from "react";
import styles from "./SidebarFilter.module.css";
import { ICategoria } from "../../../types/ICategoria";
import { ServiceCategoria } from "../../../services/categoriaService";

const SidebarFilter = () => {
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const service = new ServiceCategoria();

  useEffect(() => {
    const fetf = async () => {
      const cate = await service.getCategorias();

      setCategorias(cate);
    };

    fetf();
  }, []);

  return (
    <>
      <div className={styles.sidebarFilterContainer}>
        <div className={styles.filterButtonContainer}>
          <button>Aplicar Filtros</button>
        </div>

        <div className={styles.sortSection}>
          <h3>Ordenar por:</h3>
          <div className={styles.checkboxItem}>
            <input type="checkbox" id="masVendidos" />
            <label htmlFor="masVendidos">Más vendidos</label>
          </div>
          <div className={styles.checkboxItem}>
            <input type="checkbox" id="nuevos" />
            <label htmlFor="nuevos">Nuevos</label>
          </div>
          <div className={styles.checkboxItem}>
            <input type="checkbox" id="ascendente" />
            <label htmlFor="ascendente">Ascendente</label>
          </div>
          <div className={styles.checkboxItem}>
            <input type="checkbox" id="descendente" />
            <label htmlFor="descendente">Descendente</label>
          </div>
        </div>

        <div className={styles.categorySection}>
          <h3>Categoría:</h3>
          {categorias.length > 0 &&
            categorias.map((cat) => (
              <div className={styles.checkboxItem}>
                <input type="checkbox" id="urbano" />
                <label htmlFor="urbano">{cat.nombre}</label>
              </div>
            ))}
        </div>

        <div className={styles.productTypeSection}>
          <h3>Tipo Producto:</h3>
          <div className={styles.checkboxItem}>
            <input type="checkbox" id="zapatillas" />
            <label htmlFor="zapatillas">Zapatillas</label>
          </div>
          <div className={styles.checkboxItem}>
            <input type="checkbox" id="botines" />
            <label htmlFor="botines">Botines</label>
          </div>
          <div className={styles.checkboxItem}>
            <input type="checkbox" id="sandalias" />
            <label htmlFor="sandalias">Sandalias</label>
          </div>
        </div>

        <div className={styles.sizeSection}>
          <h3>Talle:</h3>
          <div className={styles.checkboxItem}>
            <input type="checkbox" id="35-39" />
            <label htmlFor="35-39">35-39</label>
          </div>
          <div className={styles.checkboxItem}>
            <input type="checkbox" id="40-43" />
            <label htmlFor="40-43">40-43</label>
          </div>
          <div className={styles.checkboxItem}>
            <input type="checkbox" id="43-46" />
            <label htmlFor="43-46">43-46</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarFilter;

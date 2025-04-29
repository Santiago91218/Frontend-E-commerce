import { useState } from "react";
import { products } from "../../../types/products";
import CardProducts from "../../ui/Cards/CardProducts/CardProducts";
import Footer from "../../ui/Footer/Footer";
import Header from "../../ui/Header/Header";
import styles from "./ScreenProductPage.module.css";
import { useParams } from "react-router";

const ScreenProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((prod) => prod.id === Number(id));
  const [cantidad, setCantidad] = useState<number>(1);
  const increment = () => setCantidad((prev) => (prev < 10 ? prev + 1 : prev));
  const decrement = () => setCantidad((prev) => (prev > 1 ? prev - 1 : prev));

  const [talleSeleccionado, setTalleSeleccionado] = useState<number | null>(null);

  return (
    <>
      <div className={styles.screenProductPage}>
        <Header />

        <div className={styles.infoText}>
          <p>Aceptamos todo tipo de pagos!!</p>
        </div>

        <div className={styles.productDetail}>
          <div className={styles.secondaryImage}>
            <img src="" alt="" />
          </div>
          <div className={styles.mainImage}>
            <img src={product?.image} alt={product?.name} />
          </div>

          <div className={styles.productInfo}>
            <h3>{product?.name}</h3>
            <p>Tipo: {product?.type}</p>
            <p>Categoria: {product?.category}</p>
            <p>Precio: ${product?.price}</p>
            <p>Descripcion: {product?.description}</p>

            <div>
              <h3>Selecciona el talle</h3>
              <div className={styles.sizeGrid}>
                {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46].map((size) => (
                  <button
                    key={size}
                    className={`${styles.sizeButton} ${
                      talleSeleccionado === size ? styles.selected : ""
                    }`}
                    onClick={() => setTalleSeleccionado(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className={styles.quantityContainer}>
                <span>
                  Cantidad: {cantidad}
                </span>

                <div className={styles.quantityButtons}>
                  <button onClick={increment}>+</button>
                  <button onClick={decrement}>-</button>
                </div>
              </div>

              <div className={styles.addToCartButton}>
                <button>Agregar al carrito</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.featuredSection}>
          <h3 className={styles.featuredTitle}>Productos Relacionados:</h3>
          <div className={styles.featuredProducts}>
            <CardProducts />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default ScreenProductPage;

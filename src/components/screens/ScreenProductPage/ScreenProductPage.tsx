import { useEffect, useState } from "react";
import { products } from "../../../types/products";
import CardProducts from "../../ui/Cards/CardProducts/CardProducts";
import Footer from "../../ui/Footer/Footer";
import Header from "../../ui/Header/Header";
import styles from "./ScreenProductPage.module.css";
import { useParams } from "react-router";
import { IDetalle } from "../../../types/detalles/IDetalle";



const ScreenProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((prod) => prod.id === Number(id));
  const [cantidad, setCantidad] = useState<number>(1);
  const increment = () => setCantidad((prev) => (prev < 10 ? prev + 1 : prev));
  const decrement = () => setCantidad((prev) => (prev > 1 ? prev - 1 : prev));
  const [mainImage, setMainImage] = useState(product?.image);
  const [talleSeleccionado, setTalleSeleccionado] = useState<number | null>(
    null
  );
  const [producto, setProducto] = useState<IDetalle>();

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const response = await fetch(`http://localhost:8080/detalles/${id}`);
        const data: IDetalle = await response.json();
        setProducto(data);
        setMainImage(data.imagenes?.[0]?.url || "");
      } catch (error) {
        console.error("Error al obtener detalle:", error);
      }
    };

    fetchDetalle();
  }, [id]);

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <>
      <div className={styles.screenProductPage}>
        <Header />
        
        <div className={styles.infoText}>
          <p>Aceptamos todo tipo de pagos!!</p>
        </div>
        <div className={styles.productDetail}>
          <div className={styles.secondaryImage}>
            {producto.imagenes.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={`Vista ${img.alt}`}
                className={styles.thumbnail}
                onClick={() => setMainImage(img.url)}
              />
            ))}
          </div>
          <div className={styles.mainImage}>
            <img src={mainImage} alt={producto.imagenes[0].alt} />
          </div>

          <div className={styles.productInfo}>
            <h3>{producto.producto.nombre}</h3>
            <p>Tipo: {producto.producto.tipoProducto}</p>
            <p>Categoria: {producto.producto.categoria.nombre}</p>
            {producto.precio ? (
              <p>Precio: ${producto.precio.precioCompra}</p>
            ) : (
              <p>Precio no disponible</p>
            )}
            <p>Descripcion: {producto.producto.descripcion || "No disponible"}</p>

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
                <span>Cantidad: {cantidad}</span>

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
            <CardProducts products={[]} />
          </div>
        
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ScreenProductPage;

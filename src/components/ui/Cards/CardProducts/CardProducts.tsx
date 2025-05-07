import styles from "./CardProducts.module.css";
import { FC } from "react";
import { IDetalleDTO } from "../../../../types/detalles/IDetalleDTO";
import { useNavigate } from "react-router";

interface IProps {
  products: IDetalleDTO;
}

const CardProducts: FC<IProps> = ({ products }) => {
  const navigate = useNavigate();
  

  if (!products || !products.producto) {
    return <div>Producto no disponible</div>;
  }

  const handleNavigate = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      
          <div className={styles.productCard}>
            <div className={styles.productImage}>
              {products.imagenPrincipal ? (
                <img
                  src={products.imagenPrincipal.url || "Imagen del producto"}
                  alt={products.imagenPrincipal.alt || "Imagen del producto"}
                  onError={(e) => (e.currentTarget.src = "/fallback.jpg")}
                />
              ) : (
                <div className={styles.imagePlaceholder}>Sin imagen</div>
              )}
            </div>

            <div className={styles.productDetails}>
              <div className={styles.productInfo}>
                <p className={styles.productName}>{products.producto.nombre}</p>
                <p className={styles.productPrice}>
                  {products.precio.precioVenta
                    ? `$${products.precio.precioVenta}`
                    : "Sin precio"}
                </p>
              </div>

              <div className={styles.productActions}>
                <button
                  className={styles.productButton}
                  onClick={() => handleNavigate(products.id!)}
                >
                  Ver más
                </button>
              </div>
            </div>
          </div>
    </>
  );
};

export default CardProducts;

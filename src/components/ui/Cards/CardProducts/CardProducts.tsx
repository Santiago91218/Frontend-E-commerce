import styles from "./CardProducts.module.css";
import { products } from "../../../../types/products";
import { IProducto } from "../../../../types/IProducto";
import { FC } from "react";
import { IDetalleDTO } from "../../../../types/detalles/IDetalleDTO";

interface IProps{
  products:IDetalleDTO[]
}

const CardProducts:FC<IProps> = ({products}) => {

  const handleNavigate= (id: number) => {
    window.location.href = `/product/${id}`;
  };

  return (
    <>
      {products && products.length > 0 ? (
      products.map((product) => (
        <div key={product.producto.id} className={styles.productCard}>
          <div className={styles.productImage}>
            <img src={product.imagenPrincipal.url} alt={product.imagenPrincipal.alt} />
          </div>

          <div className={styles.productDetails}>
            <div className={styles.productInfo}>
              <p className={styles.productName}>{product.producto.nombre}</p>
              <p className={styles.productPrice}>${product.precio ? `$${product.precio.precioCompra}` : "Sin precio"}</p>
            </div>

            <div className={styles.productActions}>
              <button className={styles.productButton} onClick={() => handleNavigate(product.producto.id)}>Ver más</button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div>No hay productos disponibles</div>
    )}
    </>
  );
};

export default CardProducts;

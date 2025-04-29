
import styles from "./CardProducts.module.css";
import { products } from "../../../../types/products";


const CardProducts = () => {


  const handleNavigate= (id: number) => {
    window.location.href = `/product/${id}`;
  };

  return (
    <>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <div className={styles.productImage}>
            <img src={product.image} alt={product.name} />
          </div>

          <div className={styles.productDetails}>
            <div className={styles.productInfo}>
              <p className={styles.productName}>{product.name}</p>
              <p className={styles.productPrice}>${product.price}</p>
            </div>

            <div className={styles.productActions}>
              <button className={styles.productButton} onClick={() => handleNavigate(product.id)}>Ver más</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardProducts;

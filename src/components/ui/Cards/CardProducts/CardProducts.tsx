import styles from "./CardProducts.module.css";

const CardProducts = () => {
  const products = [
    {
      id: 1,
      name: "Air Force 1",
      price: 200000,
      image:
        "https://nikearprod.vtexassets.com/arquivos/ids/531562-800-800?width=800&height=800&aspect=true",
    },
    {
      id: 2,
      name: "Air Max 90",
      price: 250000,
      image:
        "https://nikearprod.vtexassets.com/arquivos/ids/492740-800-800?width=800&height=800&aspect=true",
    },
    {
      id: 3,
      name: "Nike Dunk Low",
      price: 230000,
      image:
        "https://nikearprod.vtexassets.com/arquivos/ids/491390-800-800?width=800&height=800&aspect=true",
    },
    {
      id: 4,
      name: "Jordan 1 Retro",
      price: 300000,
      image:
        "https://nikearprod.vtexassets.com/arquivos/ids/492343-800-800?width=800&height=800&aspect=true",
    },
  ];

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
              <button className={styles.productButton}>Ver más</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardProducts;

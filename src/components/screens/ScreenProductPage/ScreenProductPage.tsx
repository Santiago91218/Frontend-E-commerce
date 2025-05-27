import { useEffect, useState } from "react";
import CardProducts from "../../ui/Cards/CardProducts/CardProducts";
import Footer from "../../ui/Footer/Footer";
import Header from "../../ui/Header/Header";
import styles from "./ScreenProductPage.module.css";
import { useParams } from "react-router";
import { IDetalle } from "../../../types/detalles/IDetalle";
import { ServiceDetalle } from "../../../services/serviceDetalle";
import { IDetalleDTO } from "../../../types/detalles/IDetalleDTO";

const ScreenProductPage = () => {
  const { id } = useParams();
  const [cantidad, setCantidad] = useState<number>(1);
  const increment = () => setCantidad((prev) => (prev < 10 ? prev + 1 : prev));
  const decrement = () => setCantidad((prev) => (prev > 1 ? prev - 1 : prev));
  const [mainImage, setMainImage] = useState<string>("");
  const [talleSeleccionado, setTalleSeleccionado] = useState<number | null>(
    null
  );
  const [producto, setProducto] = useState<IDetalle>();
  const [productosRelacionados, setProductoRelacionados] = useState<
    IDetalleDTO | any
  >();
  const detalleService = new ServiceDetalle();

  //State detalles por producto
  const [detallesProducto, setDetallesProducto] = useState<IDetalle[]>([]);

  useEffect(() => {
    if (producto?.producto.id) {
      getDetallesPorProducto();
    }
  }, [producto]);

  useEffect(() => {
    getProductsByID();
    getProductsRelacionados();
  }, [id]);

  useEffect(() => {
    if (producto) {
      getProductsRelacionados();
    }
  }, [producto]);

  const getProductsByID = async () => {
    const product = await detalleService.getDetalleById(parseInt(id!));

    setProducto(product);
    if (product?.imagenes?.length > 0) {
      setMainImage(product.imagenes[0].url);
    }
  };

  const getProductsRelacionados = async () => {
    if (!producto) return;

    const tipo = producto.producto.tipoProducto;
    const genero = producto.producto.generoProducto;
    const idDetalle = producto.id;

    const relacionados = await detalleService.getProductosRelacionados(
      tipo,
      genero,
      idDetalle!
    );

    setProductoRelacionados(relacionados);
  };
  if (!producto)
    return <h2 style={{ textAlign: "center" }}>Cargando producto...</h2>;

  //Obtener detalles por producto
  const getDetallesPorProducto = async () => {
    try {
      const detalles = await detalleService.getDetallesPorProducto(
        producto.producto.id
      );
      setDetallesProducto(detalles);
    } catch (error) {
      console.error("Error al obtener detalles del producto", error);
    }
  };

  return (
    <>
      <div className={styles.screenProductPage}>
        <Header />

        <div className={styles.infoText}>
          <p>Aceptamos todo tipo de pagos!!</p>
        </div>
        <div className={styles.productDetail}>
          <div className={styles.secondaryImage}>
            {producto.imagenes?.map((img, index) => (
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
            <p>
              Descripcion: {producto.producto.descripcion || "No disponible"}
            </p>

            <div>
              <h3>Selecciona el talle</h3>
              <div className={styles.sizeGrid}>
                {detallesProducto.map((detalle) => (
                  <button
                    key={detalle.id}
                    className={`${styles.sizeButton} ${
                      talleSeleccionado === detalle.talle.id
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => {
                      setTalleSeleccionado(detalle.talle.id);
                      setProducto(detalle); // Esto cambia todo el producto que estamos viendo (imagen, precio, stock)
                      if (detalle.imagenes.length > 0) {
                        setMainImage(detalle.imagenes[0].url);
                      }
                    }}
                  >
                    {detalle.talle.talle}
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
            {productosRelacionados?.map((producto: IDetalleDTO) => (
              <CardProducts key={producto.id} products={producto} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ScreenProductPage;

import { FC } from "react";
import { IDetalleDTO } from "../../../../types/detalles/IDetalleDTO";
import styles from "./CardAdmin.module.css";

type IProps = {
  producto: IDetalleDTO[];  // Cambié de 'producto' a 'productos'
  onEdit: (producto: IDetalleDTO) => void;
};

const CardAdmin: FC<IProps> = ({ producto, onEdit }) => {
  return (
    <div className={styles.gridContainer}>
      {producto && producto.length > 0 ? (
        producto.map((item) => (
          <div className={styles.card}>
            <img
              src={item.imagenPrincipal?.url}
              alt="Imagen del producto"
              className={styles.image}
            />
            <h3 className={styles.title}>Título: {item.producto?.nombre}</h3>
            <p className={styles.description}>
              Descripción: {item.producto?.descripcion}
            </p>
            <p className={styles.price}>$ {item.precio?.precioVenta}</p>
            <p className={styles.meta}>
              Categoría: {item.producto?.categoria.nombre}
            </p>
            <p className={styles.meta}>Género: {item.producto?.sexo}</p>
            <p className={styles.meta}>Tipo: {item.producto?.tipoProducto}</p>
            <div className={styles.actions}>
              <button type="button" className={styles.deleteButton}>
                Eliminar
              </button>
              <button onClick={() => onEdit(item)}>Editar</button>
            </div>
          </div>
        ))
      ) : (
        <div>No hay productos disponibles</div>
      )}
    </div>
  );
};

export default CardAdmin;

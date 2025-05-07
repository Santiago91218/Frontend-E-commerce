import { FC } from "react";
import styles from "./CardAdmin.module.css";
import { IDetalle } from "../../../../types/detalles/IDetalle";

type IProps = {
  producto: IDetalle[];
  onEdit: (producto: IDetalle) => void;
};

const CardAdmin: FC<IProps> = ({ producto, onEdit }) => {
  return (
    <div className={styles.gridContainer}  >
      {producto ? (
        producto.map((item) => (
          <div className={styles.card} key ={item.id}>
            <img
              src={item.imagenes && item.imagenes.length > 0 ? item.imagenes[0].url : 'default-image-url'}
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
            <p className={styles.meta}>
              Género: {item.producto?.generoProducto}
            </p>
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

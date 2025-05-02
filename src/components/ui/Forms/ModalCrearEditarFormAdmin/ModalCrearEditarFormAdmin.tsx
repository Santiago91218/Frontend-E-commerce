import { FC, useEffect, useState } from "react";
import { IDetalleDTO } from "../../../../types/detalles/IDetalleDTO";
import { Sexo, TipoProducto } from "../../../../types/IProducto";
import styles from "./ModalCrearEditarFormAdmin.module.css";
import { addDetalle } from "../../../../http/api";
import { IDetalle } from "../../../../types/detalles/IDetalle";

// Estructura inicial de datos para la creación
const initialState: IDetalle = {
  id: 0,
  disponible: true,
  talle: {
    id: 0,
    disponible: true,
    talle: "",
  },
  stock: 0,
  producto: {
    id: 0,
    disponible: true,
    nombre: "",
    descripcion: "",
    categoria: {
      id: 0,
      disponible: true,
      nombre: "",
    },
    tipoProducto: TipoProducto.REMERA,
    sexo: Sexo.MASCULINO,
  },
  estado: true,
  precio: {
    id: 0,
    precioCompra: 0,
    precioVenta: 0,
    disponible: true,
    descuento: {
      id: 0,
      disponible: true,
      fechaInicio: "",
      fechaFin: "",
      descuento: 0,
    },
  },
  imagenes: [
    {
      id: 0,
      disponible: true,
      url: "",
      alt: "",
      detalle: {} as IDetalle,
    },
  ],
};

interface IProps {
  closeModal: () => void;
  producto: IDetalleDTO | null;
}

const ModalCrearEditarFormAdmin: FC<IProps> = ({ closeModal, producto }) => {
  // Inicializar el formulario con los datos del producto o el estado inicial
  const [formData, setFormData] = useState<IDetalleDTO>(producto || initialState);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{producto ? "Editar producto" : "Crear producto"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Título</p>
            <input
              type="text"
              name="producto.nombre"
              value={formData?.producto?.nombre || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            <p>Descripción</p>
            <input
              type="text"
              name="producto.descripcion"
              value={formData?.producto?.descripcion || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            <p>Precio</p>
            <input
              type="number"
              name="precio.precioVenta"
              value={formData?.precio?.precioVenta || 0}
              onChange={handleChange}
            />
          </label>

          <label>
            <p>Categoría</p>
            <input
              type="text"
              name="producto.categoria.nombre"
              value={formData?.producto?.categoria?.nombre || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            <p>Tipo</p>
            <select
              name="producto.tipoProducto"
              value={formData?.producto?.tipoProducto || ""}
              onChange={handleChange}
            >
              <option value={TipoProducto.REMERA}>REMERA</option>
              <option value={TipoProducto.ZAPATILLAS}>ZAPATILLAS</option>
              <option value={TipoProducto.BUZO}>BUZO</option>
              <option value={TipoProducto.PANTALON}>PANTALON</option>
              <option value={TipoProducto.CAMPERA}>CAMPERA</option>
            </select>
          </label>

          <label>
            <p>Género</p>
            <select
              name="producto.sexo"
              value={formData?.producto?.sexo || ""}
              onChange={handleChange}
            >
              <option value={Sexo.MASCULINO}>Masculino</option>
              <option value={Sexo.FEMENINO}>Femenino</option>
            </select>
          </label>

          <label>
            <p>Imágenes</p>
            <input
              type="text"
              name="imagenes"
              value={formData?.imagenPrincipal?.url || ""}
              onChange={handleChange}
            />
          </label>

          <div className={styles.buttonContainer}>
            <button type="submit">
              {producto ? "Guardar cambios" : "Crear producto"}
            </button>
            <button type="button" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCrearEditarFormAdmin;

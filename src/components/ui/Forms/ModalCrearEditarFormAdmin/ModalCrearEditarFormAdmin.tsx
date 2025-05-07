import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { IDetalleDTO } from "../../../../types/detalles/IDetalleDTO";
import {  GeneroProducto, TipoProducto } from "../../../../types/IProducto";
import styles from "./ModalCrearEditarFormAdmin.module.css";

import { IDetalle } from "../../../../types/detalles/IDetalle";
import { detalleStore } from "../../../../store/detalleStore";
import { ServiceDetalle } from "../../../../services/serviceDetalle";


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
    generoProducto: GeneroProducto.MASCULINO,
    disponible: true,
    nombre: "",
    descripcion: "",
    categoria: {
      id: 0,
      disponible: true,
      nombre: "",
    },
    tipoProducto: TipoProducto.REMERA,
  
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
      url: "default-image-url",
      alt: "",
      detalle: {} as IDetalle,
    },
  ],
};

interface IProps {
  closeModal: () => void;
  producto: IDetalle | null;
}

const ModalCrearEditarFormAdmin: FC<IProps> = ({ closeModal, producto }) => {
  const [formData, setFormData] = useState<IDetalle>(initialState);

  const serviceDetalle = new ServiceDetalle();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      if (producto) {
        
        await serviceDetalle.editarDetalle(formData.id, formData);
        console.log("Producto editado con éxito");
      } else {
        
        await serviceDetalle.crearDetalle(formData);
        console.log("Producto creado con éxito");
        window.location.reload();
      }

      closeModal();

    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };
  
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev };
  
      switch (name) {
        case "producto.nombre":
          updated.producto.nombre = value;
          break;
        case "producto.descripcion":
          updated.producto.descripcion = value;
          break;
        case "precio.precioVenta":
          updated.precio.precioVenta = parseFloat(value);
          break;
        case "producto.categoria.nombre":
          updated.producto.categoria.nombre = value;
          break;
        case "producto.tipoProducto":
          updated.producto.tipoProducto = value as TipoProducto;
          break;
        case "producto.generoProducto":
          updated.producto.generoProducto = value as GeneroProducto;
          break;
        case "imagenes":
          updated.imagenes[0].url = value;
          break;
        default:
          break;
      }
      return updated;
    });
  };
  useEffect(() => {
    if (producto) {
      setFormData(producto);
    } else {
      setFormData(initialState);
    }
  }, [producto]);
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
              value={formData.producto.nombre || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            <p>Descripción</p>
            <input
              type="text"
              name="producto.descripcion"
              value={formData.producto.descripcion || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            <p>Precio</p>
            <input
              type="number"
              name="precio.precioVenta"
              value={formData.precio.precioVenta || 0}
              onChange={handleChange}
            />
          </label>

          <label>
            <p>Categoría</p>
            <input
              type="text"
              name="producto.categoria.nombre"
              value={formData.producto.categoria.nombre || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            <p>Tipo</p>
            <select
              name="producto.tipoProducto"
              value={formData.producto.tipoProducto || ""}
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
              name="producto.generoProducto"
              value={formData.producto.generoProducto || ""}
              onChange={handleChange}
            >
              <option value={GeneroProducto.MASCULINO}>Masculino</option>
              <option value={GeneroProducto.FEMENINO}>Femenino</option>
              <option value={GeneroProducto.INFANTIL}>Infantil</option>
            </select>
          </label>

          <label>
            <p>Imágenes</p>
            <input
              type="text"
              name="imagenes"
              value={formData.imagenes && formData.imagenes.length > 0 ? formData.imagenes[0].url : ""}
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

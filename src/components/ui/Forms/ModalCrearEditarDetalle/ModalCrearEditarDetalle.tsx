import { FC, useEffect, useState } from "react";
import { IDetalle } from "../../../../types/detalles/IDetalle";
import styles from "./ModalCrearEditarDetalle.module.css";
import { ServiceTalle } from "../../../../services/talleService";
import { ITalle } from "../../../../types/ITalle";
import { ServiceDetalle } from "../../../../services/serviceDetalle";
import { ServicePrecio } from "../../../../services/servicePrecio";
import { ServiceDescuento } from "../../../../services/serviceDescuento";
import { IPrecio } from "../../../../types/IPrecio";
import { IProducto } from "../../../../types/IProducto";

interface IProps {
  closeModal: () => void;
  detalle?: IDetalle | null;
  producuto: IProducto;
  onSubmit?: (detalle: IDetalle) => void;
}

export const ModalCrearEditarDetalle: FC<IProps> = ({
  closeModal,
  detalle,
  onSubmit,
  producuto,
}) => {
  const [formState, setFormState] = useState<Omit<IDetalle, "id">>({
    color: detalle?.color || "",
    descripcion: detalle?.descripcion || "",
    estado: detalle?.estado ?? true,
    precio: detalle?.precio || {
      precioCompra: 0,
      precioVenta: 0,
      descuento: {
        fechaInicio: "",
        fechaFin: "",
        descuento: 0,
      },
    },
    producto: detalle?.producto || producuto,
    stock: detalle?.stock || 0,
    talle: detalle?.talle || { talle: "" },
    destacado: detalle?.destacado ?? false,
  });

  const [tallesDisponibles, setTallesDisponibles] = useState<ITalle[]>([]);
  const [usarDescuento, setUsarDescuento] = useState<boolean>(
    !!detalle?.precio?.descuento?.id
  );
  const serviceTalle = new ServiceTalle();
  const serviceDetalle = new ServiceDetalle();
  const servicePrecio = new ServicePrecio();
  const serviceDescuento = new ServiceDescuento();

  useEffect(() => {
    const getAllTalles = async () => {
      const talles = await serviceTalle.getTalles();
      setTallesDisponibles(talles);
    };
    getAllTalles();
  }, []);

  const handleGuardarDetalle = async (detalle: IDetalle) => {
    try {
      let descuentoId = 0;
      if (detalle.precio.descuento && detalle.precio.descuento.descuento > 0) {
        if (detalle.precio.descuento.id && detalle.precio.descuento.id > 0) {
          await serviceDescuento.editarDescuento(detalle.precio.descuento); // actualizar descuento existente
          descuentoId = detalle.precio.descuento.id;
        } else {
          const responseDescuento = await serviceDescuento.crearDescuento(
            // Crear descuento nuevo
            detalle.precio.descuento
          );
          descuentoId = responseDescuento.id;
        }
      }

      const precioData: IPrecio = {
        precioCompra: detalle.precio.precioCompra,
        precioVenta: detalle.precio.precioVenta,
        descuento: descuentoId
          ? {
              id: descuentoId,
              fechaInicio: detalle.precio.descuento?.fechaInicio || "",
              fechaFin: detalle.precio.descuento?.fechaFin || "",
              descuento: detalle.precio.descuento?.descuento || 0,
            }
          : null,
      };

      let precioId = 0;
      if (detalle.precio.id && detalle.precio.id > 0) {
        await servicePrecio.editarPrecio({
          // Actualizar precio existente
          id: detalle.precio.id,
          ...precioData,
        });
        precioId = detalle.precio.id;
      } else {
        const responsePrecio = await servicePrecio.crearPrecio(precioData); // Crear precio nuevo
        precioId = responsePrecio.id;
      }

      if (!detalle.producto && !producuto) {
        console.error("Producto es requerido");
        return;
      }

      const detalleData = {
        id: detalle.id,
        color: detalle.color,
        descripcion: detalle.descripcion,
        estado: detalle.estado,
        precio: { id: precioId },
        producto: { id: producuto.id },
        stock: detalle.stock,
        talle: { id: detalle.talle.id },
        destacado: detalle.destacado,
      };

      if (detalle.id && detalle.id > 0) {
        await serviceDetalle.editarDetalle(detalle.id, detalleData); // Actualizar detalle existent
        console.log("Detalle actualizado correctamente");
      } else {
        await serviceDetalle.crearDetalle(detalleData); // Crear detalle nuevo
        console.log("Detalle creado correctamente");
      }

      await serviceDetalle.getDetallesPorProducto(producuto.id);
    } catch (error) {
      console.error("Error al guardar detalle", error);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const detalleToSave: IDetalle = {
      ...detalle,
      ...formState,
      precio: {
        ...formState.precio,
        descuento: usarDescuento
          ? formState.precio.descuento
          : {
              fechaInicio: "",
              fechaFin: "",
              descuento: 0,
            },
      },
    };

    await handleGuardarDetalle(detalleToSave);
    onSubmit?.(detalleToSave);
    closeModal();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === "stock" ? Number(value) : value,
    }));
  };

  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      precio: {
        ...prev.precio,
        [name]:
          name === "precioCompra" || name === "precioVenta"
            ? Number(value)
            : value,
      },
    }));
  };

  const handleDescuentoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      precio: {
        ...prev.precio,
        descuento: {
          ...prev.precio.descuento,
          [name]: name === "descuento" ? Number(value) : value,
        },
      },
    }));
  };

  const handleTalleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    const selectedTalle = tallesDisponibles.find((t) => t.id === selectedId);
    if (selectedTalle) {
      setFormState((prev) => ({
        ...prev,
        talle: selectedTalle,
      }));
    }
  };

  useEffect(() => {
    setFormState({
      color: detalle?.color || "",
      descripcion: detalle?.descripcion || "",
      estado: detalle?.estado ?? true,
      imagenes: detalle?.imagenes || [],
      precio: detalle?.precio || {
        precioCompra: 0,
        precioVenta: 0,
        descuento: {
          fechaInicio: "",
          fechaFin: "",
          descuento: 0,
        },
      },
      producto: detalle?.producto || producuto,
      stock: detalle?.stock || 0,
      talle: detalle?.talle || { talle: "" },
      destacado: detalle?.destacado ?? false,
    });
  }, [detalle, producuto]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{detalle ? "Editar Detalle" : "Crear Detalle"}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Color</label>
            <input
              placeholder="Ingrese el color"
              type="text"
              name="color"
              value={formState.color}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Stock</label>
            <input
              placeholder="Ingrese el stock"
              type="number"
              name="stock"
              value={formState.stock}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Descripción</label>
            <textarea
              placeholder="Ingrese la descripción"
              name="descripcion"
              value={formState.descripcion}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Talle</label>
            <select
              name="talle"
              id="talle"
              value={formState.talle.id}
              onChange={handleTalleChange}
            >
              {tallesDisponibles.map((talle) => (
                <option key={talle.id} value={talle.id}>
                  {talle.talle}
                </option>
              ))}
            </select>
            <label>
              <input
                type="checkbox"
                name="destacado"
                checked={formState.destacado}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    destacado: e.target.checked,
                  }))
                }
              />
              Marcar como destacado
            </label>
          </div>
          <div className={styles.formGroup}>
            <h2>Precio</h2>
            <label>Precio Compra</label>
            <input
              type="number"
              name="precioCompra"
              value={formState.precio.precioCompra}
              onChange={handlePrecioChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Precio Venta</label>
            <input
              type="number"
              name="precioVenta"
              value={formState.precio.precioVenta}
              onChange={handlePrecioChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <h2>Descuento</h2>
            <label>
              <input
                type="checkbox"
                checked={usarDescuento}
                onChange={() => setUsarDescuento((prev) => !prev)}
              />
            </label>
          </div>
          {usarDescuento && (
            <>
              <div className={styles.formGroup}>
                <label>Fecha Inicio</label>
                <input
                  type="date"
                  name="fechaInicio"
                  value={formState.precio.descuento?.fechaInicio}
                  onChange={handleDescuentoChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Fecha fin</label>
                <input
                  type="date"
                  name="fechaFin"
                  value={formState.precio.descuento?.fechaFin}
                  onChange={handleDescuentoChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Porcentaje Descuento (%)</label>
                <input
                  type="number"
                  name="descuento"
                  value={formState.precio.descuento?.descuento}
                  onChange={handleDescuentoChange}
                  required
                />
              </div>
            </>
          )}
          <div className={styles.buttonContainer}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button className={styles.submitButton} type="submit">
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

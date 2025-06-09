import { FC, useEffect, useState } from "react";
import { IDetalle } from "../../../../types/detalles/IDetalle";
import styles from "./ModalCrearEditarDetalle.module.css";
import { ServiceTalle } from "../../../../services/talleService";
import { ITalle } from "../../../../types/ITalle";

interface IProps {
  closeModal: () => void;
  detalle?: IDetalle | null;
  onSubmit?: (detalle: IDetalle) => void;
}

export const ModalCrearEditarDetalle: FC<IProps> = ({
  closeModal,
  detalle,
  onSubmit,
}) => {
  const [formState, setFormState] = useState<Omit<IDetalle, "id">>({
    color: detalle?.color || "",
    descripcion: detalle?.descripcion || "",
    estado: detalle?.estado ?? true,
    imagenes: detalle?.imagenes || [],
    precio: detalle?.precio || { id: 0, precioCompra: 0, precioVenta: 0 },
    producto: detalle?.producto!, // deberías pasar el producto al crear
    stock: detalle?.stock || 0,
    talle: detalle?.talle || { id: 0, talle: "" }, // ejemplo
  });
  const [tallesDisponibles, setTallesDisponibles] = useState<ITalle[]>([]);
  const serviceTalle = new ServiceTalle();

  useEffect(() => {
    getAllTalles();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      const detalleToSave: IDetalle = {
        ...detalle, // para mantener el id si es edición
        ...formState,
      };
      onSubmit(detalleToSave);
    }
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

  const getAllTalles = async () => {
    const talles = await serviceTalle.getTalles();
    setTallesDisponibles(talles);
  };

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
              onChange={handleChange}
            >
              {tallesDisponibles.map((talle) => (
                <option key={talle.id} value={talle.id}>
                  {talle.talle}
                </option>
              ))}
            </select>
          </div>

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

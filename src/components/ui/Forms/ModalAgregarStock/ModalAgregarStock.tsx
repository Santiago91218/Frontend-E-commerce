import { FC, useState } from "react";
import styles from "./ModalAgregarStock.module.css";
import { ServiceDetalle } from "../../../../services/serviceDetalle";

interface IProps {
  closeModal: () => void;
  idDetalle: number;
}

export const ModalAgregarStock: FC<IProps> = ({ closeModal, idDetalle }) => {
  const [formState, setFormState] = useState<{ stock: string }>({
    stock: "",
  });

  const servideDetalle = new ServiceDetalle();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await servideDetalle.agregarStock(idDetalle, Number(formState.stock));
      closeModal();
    } catch (error) {
      console.error("Error al añadir stock", error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.titulo}>Agregar Stock</h2>

        <form onSubmit={handleSubmit} className={styles.formulario}>
          <input
            className={styles.formInput}
            onChange={handleChange}
            type="text"
            name="stock"
            value={formState.stock}
            placeholder="Ingrese el stock"
            required
          />
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

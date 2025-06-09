import { FC } from "react";
import styles from "./ModalAgregarImagen.module.css";

interface IProps {
  closeModal: () => void;
}

export const ModalAgregarImagen: FC<IProps> = ({ closeModal }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.titulo}>Añdir Imagen</h2>

        <form className={styles.formulario}>
          <input
            className={styles.formInput}
            type="text"
            name="talle"
            placeholder="Ingrese url"
            required
          />
          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton} onClick={closeModal}>
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

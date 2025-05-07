import { FC } from "react";
import styles from "./ModalCrearEditarCategoria.module.css";

interface IProps {
  closeModal: () => void;
}

export const ModalCrearEditarCategoria: FC<IProps> = ({ closeModal }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = () => {};

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.titulo}>Crear Categoria</h2>

        <form onSubmit={handleSubmit} className={styles.formulario}>
          <input
            className={styles.formInput}
            onChange={handleChange}
            type="text"
            placeholder="Ingrese el nombre"
            required
          />

          <textarea
            className={styles.formTextArea}
            onChange={handleChange}
            name=""
            id=""
            placeholder="Descripcion"
          ></textarea>

          <div className={styles.buttonContainer}>
            <button onClick={closeModal}>Cancelar</button>
            <button type="submit">Cofirmar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

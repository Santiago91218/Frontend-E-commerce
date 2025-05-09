import React, { FC, useState } from "react";
import styles from "./ModalCrearEditarCategoria.module.css";
import { ICategoria } from "../../../../types/ICategoria";

interface IProps {
  categoria?: ICategoria | null;
  closeModal: () => void;
  onSubmit?: (categoria: ICategoria) => void;
}

export const ModalCrearEditarCategoria: FC<IProps> = ({
  closeModal,
  categoria,
  onSubmit,
}) => {
  const [formState, setFormState] = useState<Omit<ICategoria, 'id'>>({
    nombre: categoria?.nombre || "",
    descripcion: categoria?.descripcion || "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (categoria?.id) {
      
      onSubmit?.({ ...formState, id: categoria.id });
    } else {
      
      const newCategoria = { ...formState };
      onSubmit?.(newCategoria as ICategoria); 
    }
    closeModal();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.titulo}>{categoria ? "Editar Categoria" : "Crear Categoria"}</h2>

        <form onSubmit={handleSubmit} className={styles.formulario}>
          <input
            className={styles.formInput}
            onChange={handleChange}
            type="text"
            name="nombre"
            value={formState.nombre}
            placeholder="Ingrese el nombre"
            required
          />
          <textarea
            className={styles.formTextArea}
            onChange={handleChange}
            name="descripcion"
            value={formState.descripcion}
            placeholder="Descripcion"
          ></textarea>
          <div className={styles.buttonContainer}>
            <button onClick={closeModal}>Cancelar</button>
            <button type="submit">Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

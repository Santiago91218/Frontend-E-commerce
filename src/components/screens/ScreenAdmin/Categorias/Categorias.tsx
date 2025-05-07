import { useState } from "react";
import styles from "./Categorias.module.css";
import { ModalCrearEditarCategoria } from "../../../ui/Forms/ModalCrearEditarCategoria/ModalCrearEditarCategoria";

export const Categorias = () => {
  const [modal, setModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <div>
      <button
        onClick={() => {
          setModal(true);
        }}
      >
        add
      </button>

      {modal && <ModalCrearEditarCategoria closeModal={handleCloseModal} />}
    </div>
  );
};

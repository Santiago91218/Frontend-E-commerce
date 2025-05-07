import { useNavigate } from "react-router";
import styles from "./ScreenAdmin.module.css";
import CardAdmin from "../../ui/Cards/CardAdmin/CardAdmin";
import { useEffect, useState } from "react";
import ModalCrearEditarFormAdmin from "../../ui/Forms/ModalCrearEditarFormAdmin/ModalCrearEditarFormAdmin";
import { IDetalle } from "../../../types/detalles/IDetalle";
import { detalleStore } from "../../../store/detalleStore";
const ScreenAdmin = () => {
  const detalle = detalleStore((state) => state.detalle);
  const setDetalle = detalleStore((state) => state.setDetalle);
  const detalleActivo = detalleStore((state) => state.detalleActivo);
  const setDetalleActivo = detalleStore((state) => state.setDetalleActivo);

  useEffect(() => {
    const fetchPedido = async () => {
      const response = await fetch("http://localhost:8080/detalles/DTO");
      const data = await response.json();
      setDetalle(data);
    };
    fetchPedido();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (producto: IDetalle | null) => {
    setDetalleActivo(producto);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const navigate = useNavigate();

  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminContent}>
        <h1 className={styles.adminTitle}>Panel de Administración</h1>
        <button onClick={() => navigate("/home")} className={styles.backButton}>
          Volver a la tienda
        </button>
        <button
          onClick={() => navigate("/admin/categorias")}
          className={styles.backButton}
        >
          Categorias
        </button>
        <div className={styles.formSection}>
          <button onClick={() => handleOpenModal(null)}>Crear</button>
          {isModalOpen && (
            <ModalCrearEditarFormAdmin
              closeModal={handleCloseModal}
              producto={detalleActivo}
            />
          )}
        </div>
        <div className={styles.listSection}>
          <CardAdmin producto={detalle} onEdit={handleOpenModal} />
        </div>
      </div>
    </div>
  );
};

export default ScreenAdmin;

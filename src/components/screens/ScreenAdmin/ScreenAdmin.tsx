import { useNavigate } from "react-router";
import styles from "./ScreenAdmin.module.css";
import CardAdmin from "../../ui/Cards/CardAdmin/CardAdmin";
import { useEffect, useState } from "react";
import { IDetalleDTO } from "../../../types/detalles/IDetalleDTO";
import ModalCrearEditarFormAdmin from "../../ui/Forms/ModalCrearEditarFormAdmin/ModalCrearEditarFormAdmin";

const ScreenAdmin = () => {
  const [producto, setProducto] = useState<IDetalleDTO[]>([]);

  useEffect(() => {
    const fetchPedido = async () => {
      const response = await fetch("http://localhost:8080/detalles/DTO");
      const data = await response.json();
      console.log("Datos recibidos: ", data);
      setProducto(data); 
    };
    fetchPedido();
  }, []);

  const [productoEditado, setProductoEditado] = useState<IDetalleDTO | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (producto?: IDetalleDTO) => {
    if (producto) {
      setProductoEditado(producto);
    } else {
      setProductoEditado(null);
    }
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => setIsModalOpen(false);

  const navigate = useNavigate();
  
  return (
    <div className={styles.adminContainer}>
      <div className={styles.adminContent}>
        <h1 className={styles.adminTitle}>Panel de Administración</h1>
        <button
          onClick={() => navigate("/home")}
          className={styles.backButton}
        >
          Volver a la tienda
        </button>
        <div className={styles.formSection}>
          <button onClick={() => handleOpenModal()}>Crear</button>
          {isModalOpen && (
            <ModalCrearEditarFormAdmin
              closeModal={handleCloseModal}
              producto={productoEditado}
            />
          )}
        </div>
        <div className={styles.listSection}>
          <CardAdmin producto={producto} onEdit={handleOpenModal} />
        </div>
      </div>
    </div>
  );
};

export default ScreenAdmin;

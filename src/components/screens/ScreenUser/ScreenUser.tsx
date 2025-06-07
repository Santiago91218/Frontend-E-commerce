import { useEffect, useState } from "react";
import { IOrdenCompra } from "../../../types/IOrdenCompra";
import Footer from "../../ui/Footer/Footer";
import Header from "../../ui/Header/Header";
import { AdminTable } from "../../ui/Tables/AdminTable/AdminTable";
import styles from "./ScreenUser.module.css";
import { getOrdenesPorUsuario } from "../../../services/ordenService";

export const ScreenUser = () => {
  const [ordenesUsuario, setOrdenesUsuario] = useState<IOrdenCompra[]>([]);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const userString = localStorage.getItem("usuario");
        const user = userString ? JSON.parse(userString) : null;

        if (user) {
          const data = await getOrdenesPorUsuario(user.id);
          setOrdenesUsuario(data);
        } else {
          console.error("Usuario no encontrado en localStorage");
        }
      } catch (error) {
        console.error("Error al obtener las ordenes:", error);
      }
    };

    fetchOrdenes();
  }, []);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.contentTittle}>
          <h2>Registro de Compras</h2>
        </div>

        <div className={styles.containerTable}>
          {ordenesUsuario.length > 0 ? (
            <AdminTable<IOrdenCompra>
              data={ordenesUsuario}
              renderItem={(orden) => (
                <div className={styles.item}>
                  <div className={styles.containerData}>
                    <p>
                      <strong>Fecha compra: </strong>
                      {new Date(orden.fechaCompra).toISOString().slice(0, 10)}
                    </p>
                    <p>
                      <strong>Total:</strong> {orden.total}
                    </p>
                  </div>
                  <p>
                    <strong>Productos/s:</strong>
                    <ul>
                      {orden.detalles.map((detalle) => (
                        <li key={detalle.id}>
                          {detalle.producto.nombre} - Cantidad:
                          {detalle.cantidad}
                        </li>
                      ))}
                    </ul>
                  </p>
                </div>
              )}
            />
          ) : (
            <p className={styles.text}>No has realizado ninguna compra</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

import { useEffect, useState } from "react";
import styles from "./Categorias.module.css";
import { ModalCrearEditarCategoria } from "../../../ui/Forms/ModalCrearEditarCategoria/ModalCrearEditarCategoria";
import { ICategoria } from "../../../../types/ICategoria";
import { AdminTable } from "../../../ui/Tables/AdminTable/AdminTable";
import { ServiceCategoria } from "../../../../services/categoriaService";

export const Categorias = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState<ICategoria | null>(
    null
  );
  const categoriaService = new ServiceCategoria();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await categoriaService.getCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    };
    fetchCategorias();
  }, []);

  const handleAdd = () => {
    setCategoriaActiva(null);
    setModalOpen(true);
  };

  const handleEdit = (categoria: ICategoria) => {
    setCategoriaActiva(categoria);
    setModalOpen(true);
  };

  const handleDelete = async (categoria: ICategoria) => {
    try {
      await categoriaService.eliminarCategoria(categoria.id);
      setCategorias((prev) => prev.filter((c) => c.id !== categoria.id));
    } catch (error) {
      console.error("Error al eliminar categoría", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (categoria: ICategoria) => {
    try {
      if (categoria.id) {
        await categoriaService.editarCategoria(categoria.id, categoria);
        setCategorias((prev) =>
          prev.map((u) => (u.id === categoria.id ? categoria : u))
        );
      } else {
        const nuevaCategoria = await categoriaService.crearCategoria(categoria);
        setCategorias((prev) => [...prev, nuevaCategoria]);
      }
      setModalOpen(false);
    } catch (error) {
      console.error("Error al guardar categoría", error);
    }
  };

  return (
    <div className={styles.container}>
      <AdminTable<ICategoria>
        data={categorias}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        renderItem={(cat) => <p>Nombre: {cat.nombre}</p>}
      />

      {modalOpen && (
        <ModalCrearEditarCategoria
          closeModal={handleCloseModal}
          onSubmit={handleSubmit}
          categoria={categoriaActiva}
        />
      )}
    </div>
  );
};

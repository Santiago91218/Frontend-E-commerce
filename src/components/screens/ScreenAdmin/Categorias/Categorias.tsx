import { useState } from "react";
import styles from "./Categorias.module.css";
import { ModalCrearEditarCategoria } from "../../../ui/Forms/ModalCrearEditarCategoria/ModalCrearEditarCategoria";
import { ICategoria } from "../../../../types/ICategoria";
import { AdminTable } from "../../../ui/Tables/AdminTable/AdminTable";

export const Categorias = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [categorias, setCategorias] = useState<ICategoria[]>([
		{ id: 1, nombre: "Urbano", descripcion: "Ropa urbana moderna" },
		{ id: 2, nombre: "Deportivo", descripcion: "Ropa para actividad física" },
		{ id: 3, nombre: "Casual", descripcion: "Estilo relajado e informal" },
	]);

	const [categoriaActiva, setCategoriaActiva] = useState<ICategoria | null>(null);

	const handleAdd = () => {
		setCategoriaActiva(null);
		setModalOpen(true);
	};

	const handleEdit = (categoria: ICategoria) => {
		setCategoriaActiva(categoria);
		setModalOpen(true);
	};

	const handleDelete = (categoria: ICategoria) => {
		setCategorias((prev) => prev.filter((c) => c.id !== categoria.id));
	};

	const handleCloseModal = () => {
		setModalOpen(false);
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

			{modalOpen && <ModalCrearEditarCategoria closeModal={handleCloseModal} />}
		</div>
	);
};

import { useState } from "react";
import styles from "./Productos.module.css";

import { GeneroProducto, IProducto, TipoProducto } from "../../../../types/IProducto";
import { AdminTable } from "../../../ui/Tables/AdminTable/AdminTable";
import ModalCrearEditarFormAdmin from "../../../ui/Forms/ModalCrearEditarProducto/ModalCrearEditarProducto";
import { detalleStore } from "../../../../store/detalleStore";
import CardAdmin from "../../../ui/Cards/CardAdmin/CardAdmin";

export const Productos = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const detalle = detalleStore((state) => state.detalle);
	const detalleActivo = detalleStore((state) => state.detalleActivo);
	const [productos, setProductos] = useState<IProducto[]>([
		{
			id: 1,
			disponible: true,
			nombre: "Remera Oversize",
			descripcion: "Remera de algodón ancha",
			tipoProducto: TipoProducto.REMERA,
			generoProducto: GeneroProducto.MASCULINO,
			categoria: { id: 1, nombre: "Urbano", descripcion: "Ropa urbana moderna" },
		},
		{
			id: 2,
			disponible: true,
			nombre: "Zapatillas Running",
			descripcion: "Para correr largas distancias",
			tipoProducto: TipoProducto.BUZO,
			generoProducto: GeneroProducto.FEMENINO,
			categoria: { id: 2, nombre: "Deportivo", descripcion: "Ropa para actividad física" },
		},
	]);

	const [productoActivo, setProductoActivo] = useState<IProducto | null>(null);

	const handleAdd = () => {
		setProductoActivo(null);
		setModalOpen(true);
	};

	const handleEdit = (producto: IProducto) => {
		setProductoActivo(producto);
		setModalOpen(true);
	};

	const handleDelete = (producto: IProducto) => {
		setProductos((prev) => prev.filter((p) => p.id !== producto.id));
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	return (
		<div className={styles.container}>
			<AdminTable<IProducto>
				data={productos}
				onAdd={handleAdd}
				onEdit={handleEdit}
				onDelete={handleDelete}
				renderItem={(producto) => (
					<div>
						<p>
							<strong>{producto.nombre}</strong>
						</p>
						<p>{producto.descripcion}</p>
						<p>
							{producto.tipoProducto} | {producto.generoProducto}
						</p>
						<p>Categoría: {producto.categoria.nombre}</p>
					</div>
				)}
			/>

			{modalOpen && (
				<ModalCrearEditarFormAdmin
					closeModal={handleCloseModal}
					producto={detalleActivo}
				/>
			)}
		</div>
	);
};

import { useEffect, useState } from "react";
import styles from "./Productos.module.css";

import { IProducto } from "../../../../types/IProducto";
import { AdminTable } from "../../../ui/Tables/AdminTable/AdminTable";
import ModalCrearEditarFormAdmin from "../../../ui/Forms/ModalCrearEditarProducto/ModalCrearEditarProducto";
import { ServiceProducto } from "../../../../services/productService";

export const Productos = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [productos, setProductos] = useState<IProducto[]>([]);
	const [productoActivo, setProductoActivo] = useState<IProducto | null>(null);

    const productoService = new ServiceProducto();

	useEffect(() => {
		const fetchProductos = async () => {
		  try {
			const data = await productoService.getProductos();
			setProductos(data);
		  } catch (error) {
			console.error("Error al cargar categorías", error);
		  }
		};
		fetchProductos();
	  }, []);

	const handleAdd = () => {
		setProductoActivo(null);
		setModalOpen(true);
	};

	const handleEdit = (producto: IProducto) => {
		setProductoActivo(producto);
		setModalOpen(true);
	};

	const handleDelete = async (producto: IProducto) => {
		try {
		  await productoService.eliminarProducto(producto.id);
		  setProductos((prev) => prev.filter((c) => c.id !== producto.id));
		} catch (error) {
		  console.error("Error al eliminar categoría", error);
		}
	  };

	const handleCloseModal = () => {
		setModalOpen(false);
	};

const handleSubmit = async (producto: IProducto) => {
	try {
	  if (producto.id) {
		await productoService.editarProducto(producto.id, producto);
		setProductos((prev) =>
		  prev.map((u) => (u.id === producto.id ? producto : u))
		);
	  } else {
		const nuevoProducto = await productoService.crearProducto(producto);
		setProductos((prev) => [...prev, nuevoProducto]);
	  }
	  setModalOpen(false);
	} catch (error) {
	  console.error("Error al guardar el Producto", error);
	}
  };

	return (
		<div className={styles.container}>
			<AdminTable<IProducto>
				data={productos}
				onAdd={handleAdd}
				onEdit={handleEdit}
				onDelete={handleDelete}
				renderItem={(producto) => (
					<div className={styles.item}>
						<p>
							<strong>{producto.nombre}</strong>
						</p>
						<p>
							{producto.tipoProducto} | {producto.generoProducto} | Categoría: {producto.categoria.nombre}
						</p>
	
					</div>
				)}
			/>
			{modalOpen && (
				<ModalCrearEditarFormAdmin
					closeModal={handleCloseModal}
					onSubmit={handleSubmit}
					producto={productoActivo}
				/>
			)}
		</div>
	);
};

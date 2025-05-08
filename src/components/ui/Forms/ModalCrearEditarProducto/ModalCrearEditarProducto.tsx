import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { GeneroProducto, TipoProducto } from "../../../../types/IProducto";
import styles from "./ModalCrearEditarProducto.module.css";
import { IDetalle } from "../../../../types/detalles/IDetalle";
import { ServiceDetalle } from "../../../../services/serviceDetalle";

const initialState: IDetalle = {
	id: 0,
	disponible: true,
	talle: {
		id: 0,
		disponible: true,
		talle: "",
	},
	stock: 0,
	producto: {
		id: 0,
		generoProducto: GeneroProducto.MASCULINO,
		disponible: true,
		nombre: "",
		descripcion: "",
		categoria: {
			id: 0,
			disponible: true,
			nombre: "",
			descripcion: "",
		},
		tipoProducto: TipoProducto.REMERA,
	},
	estado: true,
	precio: {
		id: 0,
		precioCompra: 0,
		precioVenta: 0,
		disponible: true,
		descuento: {
			id: 0,
			disponible: true,
			fechaInicio: "",
			fechaFin: "",
			descuento: 0,
		},
	},
	imagenes: [
		{
			id: 0,
			disponible: true,
			url: "default-image-url",
			alt: "",
			detalle: {} as IDetalle,
		},
	],
};

interface IProps {
	closeModal: () => void;
	producto: IDetalle | null;
}

const ModalCrearEditarProducto: FC<IProps> = ({ closeModal, producto }) => {
	const [formData, setFormData] = useState<IDetalle>(initialState);

	const serviceDetalle = new ServiceDetalle();

	useEffect(() => {
		if (producto) {
			setFormData(producto);
		} else {
			setFormData(initialState);
		}
	}, [producto]);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			if (producto) {
				await serviceDetalle.editarDetalle(formData.id!, formData);
				console.log("Producto editado con éxito");
			} else {
				await serviceDetalle.crearDetalle(formData);
				console.log("Producto creado con éxito");
				window.location.reload();
			}
			closeModal();
		} catch (error) {
			console.error("Error al guardar el producto:", error);
		}
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => {
			const updated = { ...prev };
			switch (name) {
				case "producto.nombre":
					updated.producto.nombre = value;
					break;
				case "producto.descripcion":
					updated.producto.descripcion = value;
					break;
				case "precio.precioVenta":
					updated.precio.precioVenta = parseFloat(value);
					break;
				case "producto.categoria.nombre":
					updated.producto.categoria.nombre = value;
					break;
				case "producto.tipoProducto":
					updated.producto.tipoProducto = value as TipoProducto;
					break;
				case "producto.generoProducto":
					updated.producto.generoProducto = value as GeneroProducto;
					break;
				case "imagenes":
					updated.imagenes[0].url = value;
					break;
			}
			return updated;
		});
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<h2>{producto ? "Editar producto" : "Crear producto"}</h2>
				<form
					onSubmit={handleSubmit}
					className={styles.form}
				>
					<div className={styles.formGroup}>
						<label htmlFor="producto.nombre">Título</label>
						<input
							id="producto.nombre"
							type="text"
							name="producto.nombre"
							value={formData.producto.nombre}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="producto.descripcion">Descripción</label>
						<textarea
							id="producto.descripcion"
							name="producto.descripcion"
							value={formData.producto.descripcion}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="precio.precioVenta">Precio</label>
						<input
							id="precio.precioVenta"
							type="number"
							name="precio.precioVenta"
							value={formData.precio.precioVenta}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="producto.categoria.nombre">Categoría</label>
						<input
							id="producto.categoria.nombre"
							type="text"
							name="producto.categoria.nombre"
							value={formData.producto.categoria.nombre}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="producto.tipoProducto">Tipo</label>
						<select
							id="producto.tipoProducto"
							name="producto.tipoProducto"
							value={formData.producto.tipoProducto}
							onChange={handleChange}
							required
						>
							<option value={TipoProducto.REMERA}>Remera</option>
							<option value={TipoProducto.ZAPATILLAS}>Zapatillas</option>
							<option value={TipoProducto.BUZO}>Buzo</option>
							<option value={TipoProducto.PANTALON}>Pantalón</option>
							<option value={TipoProducto.CAMPERA}>Campera</option>
						</select>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="producto.generoProducto">Género</label>
						<select
							id="producto.generoProducto"
							name="producto.generoProducto"
							value={formData.producto.generoProducto}
							onChange={handleChange}
							required
						>
							<option value={GeneroProducto.MASCULINO}>Masculino</option>
							<option value={GeneroProducto.FEMENINO}>Femenino</option>
							<option value={GeneroProducto.INFANTIL}>Infantil</option>
						</select>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="imagenes">URL de imagen</label>
						<input
							id="imagenes"
							type="text"
							name="imagenes"
							value={formData.imagenes?.[0]?.url || ""}
							onChange={handleChange}
							required
						/>
					</div>

					<div className={styles.buttonContainer}>
						<button
							type="submit"
							className={styles.submitButton}
						>
							{producto ? "Guardar cambios" : "Crear producto"}
						</button>
						<button
							type="button"
							className={styles.cancelButton}
							onClick={closeModal}
						>
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ModalCrearEditarProducto;

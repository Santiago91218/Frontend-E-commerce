import { FC, useState } from "react";
import { IUsuario } from "../../../types/IUsuario";
import styles from "./ModalAgregarDireccion.module.css";
import { crearDireccion } from "../../../services/direccionService";

interface IProps {
	usuario: IUsuario;
	onDireccionAgregada: () => void;
	onClose: () => void;
}

const ModalAgregarDireccion: FC<IProps> = ({ usuario, onDireccionAgregada, onClose }) => {
	const [form, setForm] = useState({
		calle: "",
		numero: "",
		localidad: "",
		provincia: "",
		pais: "",
		departamento: "",
		codigoPostal: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const nuevaDireccion = {
				...form,
				disponible: true,
				usuarios: [],
				usuario: { id: usuario.id },
			};

			await crearDireccion(nuevaDireccion);
			onDireccionAgregada();
			onClose();
		} catch (error) {
			console.error("Error al guardar dirección", error);
		}
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<h2>Agregar nueva dirección</h2>
				<form onSubmit={handleSubmit}>
					{[
						{ id: "calle", label: "Calle" },
						{ id: "numero", label: "Número" },
						{ id: "departamento", label: "Departamento" },
						{ id: "codigoPostal", label: "Código Postal" },
						{ id: "localidad", label: "Localidad" },
						{ id: "provincia", label: "Provincia" },
						{ id: "pais", label: "País" },
					].map(({ id, label }) => (
						<div
							className={styles.formGroup}
							key={id}
						>
							<label htmlFor={id}>{label}</label>
							<input
								id={id}
								name={id}
								value={(form as any)[id]}
								onChange={handleChange}
								required
							/>
						</div>
					))}

					<div className={styles.botones}>
						<button
							type="button"
							className={`${styles.boton} ${styles.botonCancelar}`}
							onClick={onClose}
						>
							Cancelar
						</button>
						<button
							type="submit"
							className={`${styles.boton} ${styles.botonAgregar}`}
						>
							Guardar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ModalAgregarDireccion;

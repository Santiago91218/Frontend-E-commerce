import { FC, useState } from "react";
import styles from "./ModalCrearEditarUsuario.module.css";
import { IUsuario, RolUsuario } from "../../../../types/IUsuario";

interface IProps {
	usuario?: IUsuario | null;
	closeModal: () => void;
	onSubmit?: (usuario: IUsuario) => void;
}

export const ModalCrearEditarUsuario: FC<IProps> = ({ usuario, closeModal, onSubmit }) => {
	const [formState, setFormState] = useState<IUsuario>({
		id: usuario?.id ?? Date.now(),
		nombre: usuario?.nombre || "",
		apellido: usuario?.apellido || "",
		email: usuario?.email || "",
		rol: usuario?.rol || RolUsuario.CLIENTE,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit?.(formState);
		closeModal();
	};

	return (
		<div className={styles.modalBackdrop}>
			<div className={styles.modalContent}>
				<h2>{usuario ? "Editar Usuario" : "Crear Usuario"}</h2>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						name="nombre"
						value={formState.nombre}
						onChange={handleChange}
						placeholder="Nombre"
						required
					/>
					<input
						type="text"
						name="apellido"
						value={formState.apellido}
						onChange={handleChange}
						placeholder="Apellido"
						required
					/>
					<input
						type="email"
						name="email"
						value={formState.email}
						onChange={handleChange}
						placeholder="Email"
						required
					/>
					<select
						name="rol"
						value={formState.rol}
						onChange={handleChange}
						required
					>
						<option value={RolUsuario.ADMIN}>Admin</option>
						<option value={RolUsuario.EMPLEADO}>Empleado</option>
						<option value={RolUsuario.CLIENTE}>Cliente</option>
					</select>

					<div className={styles.actions}>
						<button type="submit">Guardar</button>
						<button
							type="button"
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

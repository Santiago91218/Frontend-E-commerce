import { useState } from "react";
import styles from "./Usuarios.module.css";
import { IUsuario, RolUsuario } from "../../../../types/IUsuario";
import { AdminTable } from "../../../ui/Tables/AdminTable/AdminTable";
import { ModalCrearEditarUsuario } from "../../../ui/Forms/ModalCrearEditarUsuario/ModalCrearEditarUsuario";

export const Usuarios = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [usuarios, setUsuarios] = useState<IUsuario[]>([
		{
			id: 1,
			nombre: "Carlos",
			apellido: "Pérez",
			email: "carlos@mail.com",
			rol: RolUsuario.ADMIN,
		},
		{
			id: 2,
			nombre: "Lucía",
			apellido: "Gómez",
			email: "lucia@mail.com",
			rol: RolUsuario.EMPLEADO,
		},
	]);

	const [usuarioActivo, setUsuarioActivo] = useState<IUsuario | null>(null);

	const handleAdd = () => {
		setUsuarioActivo(null);
		setModalOpen(true);
	};

	const handleEdit = (usuario: IUsuario) => {
		setUsuarioActivo(usuario);
		setModalOpen(true);
	};

	const handleDelete = (usuario: IUsuario) => {
		setUsuarios((prev) => prev.filter((u) => u.id !== usuario.id));
	};

	const handleCloseModal = () => {
		setModalOpen(false);
	};

	const handleSubmit = (usuario: IUsuario) => {
		setUsuarios((prev) => {
			const existe = prev.some((u) => u.id === usuario.id);
			if (existe) {
				return prev.map((u) => (u.id === usuario.id ? usuario : u));
			} else {
				return [...prev, usuario];
			}
		});
		setModalOpen(false);
	};

	return (
		<div className={styles.container}>
			<AdminTable<IUsuario>
				data={usuarios}
				onAdd={handleAdd}
				onEdit={handleEdit}
				onDelete={handleDelete}
				renderItem={(usuario) => (
					<div>
						<p>
							<strong>
								{usuario.nombre} {usuario.apellido}
							</strong>
						</p>
						<p>{usuario.email}</p>
						<p>Rol: {usuario.rol}</p>
					</div>
				)}
			/>

			{modalOpen && (
				<ModalCrearEditarUsuario
					usuario={usuarioActivo}
					closeModal={handleCloseModal}
					onSubmit={handleSubmit}
				/>
			)}
		</div>
	);
};

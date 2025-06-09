import axios from "axios";
import { IDireccion } from "../types/IDireccion";

const API_URL = `${import.meta.env.VITE_URL_USUARIOS}`;

export const getDireccionesPorUsuario = async (usuarioId: number): Promise<IDireccion[]> => {
	const token = localStorage.getItem("token");

	const response = await axios.get(`${API_URL}/${usuarioId}/direcciones`, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	return response.data;
};

export const crearDireccion = async (
	direccion: Omit<IDireccion, "id"> & { usuario: { id: number } }
): Promise<IDireccion> => {
	const token = localStorage.getItem("token");
	const userId = direccion.usuario.id;

	const response = await axios.post(`${API_URL}/${userId}/direcciones`, direccion, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
	return response.data;
};

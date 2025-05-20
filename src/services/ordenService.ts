import axios from "axios";

const API_ORDEN = import.meta.env.VITE_URL_ORDEN;

export interface OrdenDetalleRequest {
	productoId: number;
	cantidad: number;
}

export interface OrdenRequest {
	usuario: { id: number };
	direccionEnvio: { id: number };
	total: number;
	detalles: {
		producto: { id: number };
		cantidad: number;
	}[];
}

export const confirmarOrden = async (orden: OrdenRequest) => {
	const res = await axios.post(`${API_ORDEN}`, orden);
	return res.data;
};

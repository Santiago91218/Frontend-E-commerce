import axios from "axios";

interface IItemCarrito {
	title: string;
	quantity: number;
	unit_price: number;
	picture_url?: string;
	category_id?: string;
}

const API_URL = import.meta.env.VITE_URL_BACKEND;

export const handlePagar = async (items: IItemCarrito[], email: string, token?: string) => {
	const itemsMP = items.map((item) => ({
		title: item.title,
		quantity: item.quantity,
		unitPrice: item.unit_price,
		picture_url: item.picture_url,
		category_id: item.category_id,
	}));

	try {
		const response = await axios.post(
			`${API_URL}/api/mercadopago/crear-preferencia`,
			{
				items: itemsMP,
				email: email,
			},
			{
				headers: {
					Authorization: token ? `Bearer ${token}` : "",
				},
			}
		);

		window.location.href = response.data.init_point;
	} catch (error) {
		console.error("Error al iniciar el pago:", error);
		alert("Ocurrió un error al iniciar el pago");
	}
};

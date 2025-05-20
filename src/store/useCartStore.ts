import { create } from "zustand";

export interface ICartItem {
	detalleId: number;
	nombre: string;
	imagen: string;
	precio: number;
	cantidad: number;
}

interface CartState {
	items: ICartItem[];
	agregar: (item: ICartItem) => void;
	eliminar: (detalleId: number) => void;
	vaciar: () => void;
	total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
	items: [],

	agregar: (item) => {
		const items = get().items;
		const index = items.findIndex((i) => i.detalleId === item.detalleId);
		if (index !== -1) {
			items[index].cantidad += item.cantidad;
			set({ items: [...items] });
		} else {
			set({ items: [...items, item] });
		}
	},

	eliminar: (detalleId) => {
		set({ items: get().items.filter((i) => i.detalleId !== detalleId) });
	},

	vaciar: () => set({ items: [] }),

	total: () => {
		return get().items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
	},
}));

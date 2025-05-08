import { IproductoCantidad } from "../types/IProducto";
import { create } from "zustand";

interface ICarritoProps {
	productos: IproductoCantidad[];
	agregarProducto: (producto: IproductoCantidad) => void;
	quitarProducto: (id: number) => void;
	vaciarCarrito: VoidFunction;
	cambiarCantidad: (id: number, cantidad: number) => void;
}

export const useCartStore = create<ICarritoProps>((set) => ({
	productos: [],
	agregarProducto: (producto) =>
		set((state) => {
			const existe = state.productos.find((p) => p.id === producto.id);
			if (existe) {
				return {
					productos: state.productos.map((p) =>
						p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
					),
				};
			}
			return { productos: [...state.productos, { ...producto, cantidad: 1 }] };
		}),
	quitarProducto: (id) =>
		set((state) => ({
			productos: state.productos.filter((p) => p.id !== id),
		})),
	vaciarCarrito: () => set({ productos: [] }),
	cambiarCantidad: (id: number, nuevaCantidad: number) =>
		set((state) => ({
			productos: state.productos.map((p) =>
				p.id === id ? { ...p, cantidad: nuevaCantidad } : p
			),
		})),
}));

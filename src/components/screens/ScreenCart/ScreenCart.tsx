import { useCartStore } from "../../../store/useCartStore";
import Footer from "../../ui/Footer/Footer";
import Header from "../../ui/Header/Header";
import { Trash2 } from "lucide-react";
import styles from "./ScreenCart.module.css";
import { confirmarOrden } from "../../../services/ordenService";

export const ScreenCart = () => {
	const { items, agregar, eliminar, vaciar, total } = useCartStore();

	const totalCantidad = items.reduce((acc, p) => acc + p.cantidad, 0);

	const cambiarCantidad = (detalleId: number, nuevaCantidad: number) => {
		const item = items.find((p) => p.detalleId === detalleId);
		if (!item) return;
		eliminar(detalleId);
		agregar({ ...item, cantidad: nuevaCantidad });
	};

	const handleConfirmar = async () => {
		try {
			const orden = {
				usuarioId: 1,
				direccionEnvioId: 1,
				total: total(),
				detalles: items.map((i) => ({
					productoId: i.detalleId,
					cantidad: i.cantidad,
				})),
			};
			await confirmarOrden(orden);
			alert("Compra confirmada 🎉");
			vaciar();
		} catch (err) {
			console.error("Error al confirmar compra:", err);
			alert("Error al procesar la orden.");
		}
	};

	return (
		<div className={styles.contenedor}>
			<Header />
			<main className={styles.main}>
				<div className={styles.contenedorPrincipal}>
					<div className={styles.contenedorProductos}>
						<h1 className={styles.titulo}>Tu carrito</h1>
						<h3 className={styles.subtitulo}>
							{totalCantidad === 0
								? "Aún no hay productos en tu carrito"
								: `Cantidad de productos: ${totalCantidad}`}
						</h3>
						{items.map((producto) => (
							<div
								key={producto.detalleId}
								className={styles.cardProducto}
							>
								<img
									src={producto.imagen}
									alt={producto.nombre}
									className={styles.imagen}
								/>
								<div className={styles.detalles}>
									<p className={styles.nombre}>{producto.nombre}</p>
									<p className={styles.nombre}>Talle: 40</p>
									<div className={styles.controlesCantidad}>
										<p className={styles.nombre}>Cantidad: </p>
										<button
											onClick={() =>
												cambiarCantidad(
													producto.detalleId,
													Math.max(1, producto.cantidad - 1)
												)
											}
											className={styles.botonCantidad}
										>
											-
										</button>
										<span className={styles.valorCantidad}>
											{producto.cantidad}
										</span>
										<button
											onClick={() =>
												cambiarCantidad(
													producto.detalleId,
													producto.cantidad + 1
												)
											}
											className={styles.botonCantidad}
										>
											+
										</button>
									</div>
								</div>
								<button
									onClick={() => eliminar(producto.detalleId)}
									className={styles.botonEliminar}
								>
									<Trash2 />
								</button>
							</div>
						))}
					</div>

					<div className={styles.resumen}>
						<h2 className={styles.resumenTitulo}>Resumen de la compra</h2>
						{items.map((p) => (
							<p key={p.detalleId}>
								{p.nombre} x {p.cantidad} = ${p.precio * p.cantidad}
							</p>
						))}
						<hr className={styles.linea} />
						<p className={styles.total}>Total a pagar: ${total()}</p>
						<button
							className={styles.botonConfirmar}
							onClick={handleConfirmar}
						>
							Confirmar
						</button>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

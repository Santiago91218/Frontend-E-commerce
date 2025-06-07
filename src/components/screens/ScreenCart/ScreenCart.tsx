import { useCartStore } from "../../../store/useCartStore";
import Footer from "../../ui/Footer/Footer";
import Header from "../../ui/Header/Header";
import { Trash2 } from "lucide-react";
import styles from "./ScreenCart.module.css";
import { confirmarOrden } from "../../../services/ordenService";
import { ServiceDetalle } from "../../../services/serviceDetalle";
import { useEffect, useState } from "react";

const detalleService = new ServiceDetalle();

export const ScreenCart = () => {
	const { items, eliminar, vaciar, total, cambiarCantidad } = useCartStore();
	const [stockMap, setStockMap] = useState<Record<number, number>>({});

	const totalCantidad = items.reduce((acc, p) => acc + p.cantidad, 0);

	const handleConfirmar = async () => {
		try {
			for (const item of items) {
				const detalle = await detalleService.getDetalleById(item.detalleId);
				if (detalle.stock < item.cantidad) {
					alert(
						`No hay suficiente stock para "${item.nombre}". Stock disponible: ${detalle.stock}`
					);
					return;
				}
			}

			const orden = {
				usuario: { id: 1 },
				direccionEnvio: { id: 1 },
				total: total(),
				detalles: items.map((i) => ({
					producto: { id: i.detalleId },
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

	useEffect(() => {
		const fetchStocks = async () => {
			const stocks: Record<number, number> = {};
			for (const item of items) {
				const detalle = await detalleService.getDetalleById(item.detalleId);
				stocks[item.detalleId] = detalle.stock;
			}
			setStockMap(stocks);
		};

		if (items.length > 0) {
			fetchStocks();
		}
	}, [items]);

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
									<p className={styles.talle}>Talle: 40</p>
									<div className={styles.controlesCantidad}>
										<span className={styles.labelCantidad}>Cantidad:</span>

										<div className={styles.simpleContador}>
											<button
												className={styles.simpleBoton}
												onClick={() =>
													cambiarCantidad(
														producto.detalleId,
														Math.max(1, producto.cantidad - 1)
													)
												}
											>
												−
											</button>

											<span className={styles.simpleValor}>
												{producto.cantidad}
											</span>

											<button
												className={styles.simpleBoton}
												onClick={() =>
													cambiarCantidad(
														producto.detalleId,
														producto.cantidad + 1
													)
												}
												disabled={
													producto.cantidad >=
													(stockMap[producto.detalleId] ?? Infinity)
												}
											>
												＋
											</button>

											{producto.cantidad >=
												(stockMap[producto.detalleId] ?? Infinity) && (
												<span className={styles.simpleWarningInline}>
													Stock máximo
												</span>
											)}
										</div>
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

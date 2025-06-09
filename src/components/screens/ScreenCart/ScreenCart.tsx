import { useCartStore } from "../../../store/useCartStore";
import Footer from "../../ui/Footer/Footer";
import Header from "../../ui/Header/Header";
import { Trash2 } from "lucide-react";
import styles from "./ScreenCart.module.css";
import { ServiceDetalle } from "../../../services/serviceDetalle";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DireccionesCliente from "../../ui/DireccionesCliente/DireccionesCliente";
import ModalAgregarDireccion from "../../ui/ModalAgregarDireccion/ModalAgregarDireccion";
import { handlePagar } from "../../../services/mercadoPagoService";
const detalleService = new ServiceDetalle();
import { mapCartItemsToMercadoPago } from "../../../types/IItemCarrito";

export const ScreenCart = () => {
	const { items, eliminar, total, cambiarCantidad } = useCartStore();
	const [stockMap, setStockMap] = useState<Record<number, number>>({});
	const [direccionSeleccionadaId, setDireccionSeleccionadaId] = useState<number | null>(null);
	const [mostrarModalDireccion, setMostrarModalDireccion] = useState(false);
	const [recargarDirecciones, setRecargarDirecciones] = useState(false);

	const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
	const totalCantidad = items.reduce((acc, p) => acc + p.cantidad, 0);

	const handlePagarUnificado = async () => {
		if (direccionSeleccionadaId === null) {
			Swal.fire("Dirección requerida", "Debés seleccionar una dirección de envío", "warning");
			return;
		}

		try {
			const detalles = await Promise.all(
				items.map((item) => detalleService.getDetalleById(item.detalleId))
			);

			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				const detalle = detalles[i];
				if (detalle.stock < item.cantidad) {
					Swal.fire(
						"Stock insuficiente",
						`No hay suficiente stock para "${item.nombre}". Stock disponible: ${detalle.stock}`,
						"warning"
					);
					return;
				}
			}

			Swal.fire({
				title: "Redirigiendo a Mercado Pago...",
				allowOutsideClick: false,
				didOpen: () => Swal.showLoading(null),
			});
			await handlePagar(mapCartItemsToMercadoPago(items));
		} catch (err) {
			console.error("Error al iniciar el pago:", err);
			Swal.fire("Error", "No se pudo iniciar el pago con Mercado Pago", "error");
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

	const handleDireccionAgregada = () => {
		setRecargarDirecciones(true);
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
									<p>Talle: {producto.talle}</p>
									{producto.descuento && producto.descuento > 0 ? (
										<p>Precio con descuento: ${producto.precio}</p>
									) : (
										<p>Precio: ${producto.precio}</p>
									)}

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
						<DireccionesCliente
							usuario={usuario}
							direccionSeleccionadaId={direccionSeleccionadaId}
							setDireccionSeleccionadaId={setDireccionSeleccionadaId}
							onAgregarDireccionClick={() => setMostrarModalDireccion(true)}
							recargar={recargarDirecciones}
						/>
						{items.map((p) => (
							<p key={p.detalleId}>
								{p.nombre} x {p.cantidad} = ${p.precio * p.cantidad}
							</p>
						))}
						<hr className={styles.linea} />
						<p className={styles.total}>Total a pagar: ${total()}</p>

						<button
							className={styles.botonConfirmar}
							onClick={handlePagarUnificado}
						>
							Pagar con Mercado Pago
						</button>
					</div>
				</div>
			</main>
			<Footer />
			{mostrarModalDireccion && (
				<ModalAgregarDireccion
					usuario={usuario}
					onDireccionAgregada={handleDireccionAgregada}
					onClose={() => {
						setMostrarModalDireccion(false);
						setRecargarDirecciones(true);
						setTimeout(() => setRecargarDirecciones(false), 200);
					}}
				/>
			)}
		</div>
	);
};

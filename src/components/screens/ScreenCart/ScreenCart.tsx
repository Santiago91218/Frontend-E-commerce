import { useCartStore } from "../../../store/useCartStore";
import Footer from "../../ui/Footer/Footer";
import Header from "../../ui/Header/Header";
import { Trash2 } from "lucide-react";
import styles from "./ScreenCart.module.css";

export const ScreenCart = () => {
	const { productos, quitarProducto, cambiarCantidad } = useCartStore();

	const totalCantidad = productos.reduce((acc, p) => acc + p.cantidad, 0);

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
						{productos.map((producto) => (
							<div
								key={producto.id}
								className={styles.cardProducto}
							>
								{/* //todo implementar imagenes */}
								{/* Imagen del producto
								{producto.imagen && (
									<img
										src={producto.imagen}
										alt={producto.nombre}
										className={styles.imagen}
									/>
								)} */}
								<img
									src="https://nikearprod.vtexassets.com/arquivos/ids/658418-800-800?width=800&height=800&aspect=true"
									className={styles.imagen}
								></img>
								<div className={styles.detalles}>
									<p className={styles.nombre}>{producto.nombre}</p>
									{/* //todo implementar talle */}
									<p className={styles.nombre}>Talle: {}</p>
									<div className={styles.controlesCantidad}>
										<p className={styles.nombre}>Cantidad: </p>
										<button
											onClick={() =>
												cambiarCantidad(
													producto.id,
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
												cambiarCantidad(producto.id, producto.cantidad + 1)
											}
											className={styles.botonCantidad}
										>
											+
										</button>
									</div>
								</div>
								<button
									onClick={() => quitarProducto(producto.id)}
									className={styles.botonEliminar}
								>
									<Trash2 />
								</button>
							</div>
						))}
					</div>

					<div className={styles.resumen}>
						<h2 className={styles.resumenTitulo}>Resumen de la compra</h2>
						{productos.map((p) => (
							<p key={p.id}>
								{/* //todo implementar precio del producto x la cantidad */}
								{p.nombre} x {p.cantidad}
							</p>
						))}
						<hr className={styles.linea} />
						{/* //todo implementar precio total */}
						<p className={styles.total}>Total a pagar: {}</p>
						<button className={styles.botonConfirmar}>Confirmar</button>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

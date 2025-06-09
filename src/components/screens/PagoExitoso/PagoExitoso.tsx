import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

const PagoExitoso = () => {
	const [mensaje, setMensaje] = useState("Procesando pago...");
	const [estado, setEstado] = useState<"cargando" | "exito" | "rechazado">("cargando");

	const [params] = useSearchParams();

	useEffect(() => {
		const status = params.get("collection_status");

		if (status === "approved") {
			setEstado("exito");
			setMensaje("¡Gracias por tu compra! El pago fue aprobado.");
			Swal.fire("Pago aprobado", "Tu pedido fue confirmado con éxito", "success");
		} else {
			setEstado("rechazado");
			setMensaje("El pago no fue aprobado o fue cancelado.");
			Swal.fire("Pago no confirmado", "No se pudo procesar el pago", "warning");
		}
	}, [params]);

	return (
		<div style={{ padding: "2rem", textAlign: "center" }}>
			<h1>{mensaje}</h1>
			{estado === "rechazado" && (
				<a
					href="/carrito"
					style={{ marginTop: "1rem", display: "inline-block" }}
				>
					Volver al carrito
				</a>
			)}
		</div>
	);
};

export default PagoExitoso;

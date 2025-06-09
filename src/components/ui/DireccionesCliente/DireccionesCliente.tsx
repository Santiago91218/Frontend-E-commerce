import { FC, useEffect, useState, useRef } from "react";
import { IDireccion } from "../../../types/IDireccion";
import { IUsuario } from "../../../types/IUsuario";
import { getDireccionesPorUsuario } from "../../../services/direccionService";

interface IProps {
	usuario: IUsuario;
	direccionSeleccionadaId: number | null;
	setDireccionSeleccionadaId: (id: number) => void;
	onAgregarDireccionClick: () => void;
	recargar: boolean;
}

const DireccionesCliente: FC<IProps> = ({
	usuario,
	direccionSeleccionadaId,
	setDireccionSeleccionadaId,
	onAgregarDireccionClick,
	recargar,
}) => {
	const [direcciones, setDirecciones] = useState<IDireccion[]>([]);
	const [loading, setLoading] = useState(true);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const cargarDirecciones = async () => {
			try {
				const direccionesUsuario = await getDireccionesPorUsuario(usuario.id);
				if (Array.isArray(direccionesUsuario)) {
					setDirecciones(direccionesUsuario);

					if (direccionesUsuario.length > 0 && direccionSeleccionadaId === null) {
						setDireccionSeleccionadaId(direccionesUsuario[0].id);
					}
				} else {
					console.warn(
						"La respuesta de getDireccionesPorUsuario no es un array:",
						direccionesUsuario
					);
					setDirecciones([]);
				}
			} catch (error) {
				console.error("Error al cargar direcciones", error);
				setDirecciones([]);
			} finally {
				setLoading(false);
			}
		};

		cargarDirecciones();
	}, [usuario.id, recargar]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	if (loading) return <p>Cargando direcciones...</p>;

	const direccionActual = direcciones.find((d) => d.id === direccionSeleccionadaId);

	return (
		<div
			className="border p-4 rounded-xl bg-white shadow-md space-y-4"
			ref={dropdownRef}
		>
			<h3 className="text-lg font-semibold">Dirección de envío</h3>

			{direcciones.length === 0 ? (
				<p className="text-sm text-gray-600">No tenés direcciones registradas.</p>
			) : (
				<div className="relative">
					<button
						type="button"
						onClick={() => setDropdownOpen(!dropdownOpen)}
						className="w-full p-3 border rounded shadow bg-white text-left hover:bg-gray-50"
					>
						{direccionActual ? (
							<>
								<p className="font-medium">
									{direccionActual.calle} {direccionActual.numero}
								</p>
								<p className="text-sm text-gray-700">
									{direccionActual.localidad}, {direccionActual.provincia},{" "}
									{direccionActual.pais}
								</p>
							</>
						) : (
							<span className="text-gray-400">Seleccioná una dirección</span>
						)}
					</button>

					{dropdownOpen && (
						<div className="absolute z-10 mt-2 w-full max-h-60 overflow-auto border bg-white rounded shadow-lg">
							{direcciones.map((direccion) => (
								<div
									key={direccion.id}
									onClick={() => {
										setDireccionSeleccionadaId(direccion.id);
										setDropdownOpen(false);
									}}
									className={`cursor-pointer p-3 border-b hover:bg-gray-100 transition ${
										direccionSeleccionadaId === direccion.id
											? "bg-blue-50 border-blue-500"
											: ""
									}`}
								>
									<p className="font-medium">
										{direccion.calle} {direccion.numero}
									</p>
									<p className="text-sm text-gray-700">
										{direccion.localidad}, {direccion.provincia},{" "}
										{direccion.pais}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			)}

			<div className="pt-2">
				<button
					type="button"
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					onClick={onAgregarDireccionClick}
				>
					Agregar dirección
				</button>
			</div>
		</div>
	);
};

export default DireccionesCliente;

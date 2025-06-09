import { FC, useEffect, useState } from "react";
import { IDireccion } from "../../../types/IDireccion";
import { getDireccionesPorUsuario, crearDireccion } from "../../../services/direccionService";

interface Props {
	cerrar: () => void;
	seleccionarDireccion: (dir: IDireccion) => void;
}

const DireccionesModal: FC<Props> = ({ cerrar, seleccionarDireccion }) => {
	const [direcciones, setDirecciones] = useState<IDireccion[]>([]);
	const [seleccionada, setSeleccionada] = useState<number | null>(null);
	const [mostrarFormulario, setMostrarFormulario] = useState(false);
	const [nuevaDireccion, setNuevaDireccion] = useState({
		calle: "",
		numero: "",
		localidad: "",
		provincia: "",
		pais: "",
		codigoPostal: "",
	});

	const storedUser = localStorage.getItem("usuario");
	const usuarioId = storedUser ? JSON.parse(storedUser).id : null;

	useEffect(() => {
		const cargar = async () => {
			const res = await getDireccionesPorUsuario(usuarioId);
			setDirecciones(res);
			if (res.length > 0 && seleccionada === null) setSeleccionada(res[0].id);
		};
		cargar();
	}, []);

	const guardar = () => {
		const dir = direcciones.find((d) => d.id === seleccionada);
		if (dir) {
			seleccionarDireccion(dir);
			cerrar();
		}
	};

	const manejarNuevaDireccion = async () => {
		const direccionCompleta = {
			...nuevaDireccion,
			disponible: true,
			departamento: "",
			usuarios: [],
			usuario: { id: usuarioId },
		};

		try {
			const creada = await crearDireccion(direccionCompleta);
			setDirecciones((prev) => [...prev, creada]);
			setSeleccionada(creada.id);
			setMostrarFormulario(false);
			setNuevaDireccion({
				calle: "",
				numero: "",
				localidad: "",
				provincia: "",
				pais: "",
				codigoPostal: "",
			});
		} catch (error) {
			console.error("Error al crear dirección:", error);
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="bg-white rounded-lg w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-auto">
				<h2 className="text-lg font-semibold">Elegí dónde recibir tus compras</h2>

				{mostrarFormulario ? (
					<div className="space-y-2">
						<input
							type="text"
							placeholder="Calle"
							className="w-full border rounded p-2"
							value={nuevaDireccion.calle}
							onChange={(e) =>
								setNuevaDireccion({ ...nuevaDireccion, calle: e.target.value })
							}
						/>
						<input
							type="text"
							placeholder="Número"
							className="w-full border rounded p-2"
							value={nuevaDireccion.numero}
							onChange={(e) =>
								setNuevaDireccion({ ...nuevaDireccion, numero: e.target.value })
							}
						/>
						<input
							type="text"
							placeholder="Localidad"
							className="w-full border rounded p-2"
							value={nuevaDireccion.localidad}
							onChange={(e) =>
								setNuevaDireccion({ ...nuevaDireccion, localidad: e.target.value })
							}
						/>
						<input
							type="text"
							placeholder="Provincia"
							className="w-full border rounded p-2"
							value={nuevaDireccion.provincia}
							onChange={(e) =>
								setNuevaDireccion({ ...nuevaDireccion, provincia: e.target.value })
							}
						/>
						<input
							type="text"
							placeholder="País"
							className="w-full border rounded p-2"
							value={nuevaDireccion.pais}
							onChange={(e) =>
								setNuevaDireccion({ ...nuevaDireccion, pais: e.target.value })
							}
						/>
						<input
							type="text"
							placeholder="Código Postal"
							className="w-full border rounded p-2"
							value={nuevaDireccion.codigoPostal}
							onChange={(e) =>
								setNuevaDireccion({
									...nuevaDireccion,
									codigoPostal: e.target.value,
								})
							}
						/>

						<div className="flex justify-between gap-2 pt-2">
							<button
								onClick={() => setMostrarFormulario(false)}
								className="px-4 py-2 border rounded hover:bg-gray-100 w-full"
							>
								Cancelar
							</button>
							<button
								onClick={manejarNuevaDireccion}
								className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
							>
								Guardar dirección
							</button>
						</div>
					</div>
				) : (
					<>
						<div className="space-y-2 max-h-64 overflow-y-auto">
							{direcciones.map((dir) => (
								<label
									key={dir.id}
									className={`block border rounded p-3 cursor-pointer ${
										seleccionada === dir.id
											? "border-blue-500 bg-blue-50"
											: "hover:bg-gray-50"
									}`}
								>
									<input
										type="radio"
										name="direccion"
										className="mr-2"
										checked={seleccionada === dir.id}
										onChange={() => setSeleccionada(dir.id)}
									/>
									<div>
										<p className="font-medium">
											{dir.calle} {dir.numero}
										</p>
										<p className="text-sm text-gray-600">
											CP: {dir.codigoPostal} - {dir.localidad},{" "}
											{dir.provincia}, {dir.pais}
										</p>
									</div>
								</label>
							))}
						</div>

						<button
							onClick={() => setMostrarFormulario(true)}
							className="text-blue-600 text-sm hover:underline"
						>
							+ Agregar nueva dirección
						</button>

						<div className="flex justify-end gap-2 pt-2">
							<button
								onClick={cerrar}
								className="px-4 py-2 border rounded hover:bg-gray-100"
							>
								Cancelar
							</button>
							<button
								onClick={guardar}
								className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
							>
								Guardar cambios
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default DireccionesModal;

import axios from "axios"
import { IDetalle } from "../types/detalles/IDetalle";
const API_URL = import.meta.env.VITE_API_URL;


// Obtener todos los detalles
export const getAllDetalles = async (): Promise<IDetalle[]> => {
  const response = await axios.get<IDetalle[]>(API_URL);
  return response.data;
};

// Obtener detalle por ID
export const getDetalleById = async (id: number): Promise<IDetalle> => {
  const response = await axios.get<IDetalle>(`${API_URL}/${id}`);
  return response.data;
};

// Agregar un nuevo detalle
export const addDetalle = async (newDetalle: IDetalle): Promise<IDetalle> => {
  const response = await axios.post<IDetalle>(API_URL, newDetalle);
  return response.data;
};

// Actualizar un detalle existente
export const updateDetalle = async (detalle: IDetalle): Promise<IDetalle> => {
  const response = await axios.put<IDetalle>(`${API_URL}/${detalle.id}`, detalle);
  return response.data;
};

// Eliminar detalle por ID
export const deleteDetalleById = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
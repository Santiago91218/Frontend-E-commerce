import axios, { AxiosResponse } from "axios";
import { ICategoria } from "../types/ICategoria";
const categoriaService = import.meta.env.VITE_URL_CATEGORIA;

export class ServiceCategoria {
  private baseURL: string;

  constructor() {
    this.baseURL = categoriaService;
  }

  public async getCategorias(): Promise<ICategoria[]> {
    const url = `${this.baseURL}`;
    const response: AxiosResponse<ICategoria[]> = await axios.get(url);
    return response.data;
  }

  public async getCategoriaById(id: number): Promise<ICategoria> {
    const url = `${this.baseURL}/${id}`;
    const response: AxiosResponse<ICategoria> = await axios.get(url);
    return response.data;
  }

  public async crearCategoria(categoria: ICategoria): Promise<ICategoria> {
    const url = `${this.baseURL}`;
    if (categoria.id === 0) {
    categoria.id = Date.now();
  }
    console.log("Datos que se envían:", categoria);
    const response: AxiosResponse<ICategoria> = await axios.post(
      url,
      categoria
    );
    return response.data;
  }

  public async editarCategoria(
    id: number,
    categoria: ICategoria
  ): Promise<ICategoria> {
    const url = `${this.baseURL}/${id}`;
    const response: AxiosResponse<ICategoria> = await axios.put(url, categoria);
    return response.data;
  }

  public async eliminarCategoria(id: number): Promise<void> {
    const url = `${this.baseURL}/${id}`;
    await axios.delete(url);
  }
}

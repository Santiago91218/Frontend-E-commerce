import axios, { AxiosResponse } from "axios";
import { IProducto } from "../types/IProducto";

const productoService = import.meta.env.VITE_URL_PRODUCTOS;

export class ServiceProducto {
  private baseURL: string;

  constructor() {
    this.baseURL = productoService;
  }

  public async getProductos(): Promise<IProducto[]> {
    const url = `${this.baseURL}`;
    const response: AxiosResponse<IProducto[]> = await axios.get(url);
    return response.data;
  }

  public async getProductoById(id: number): Promise<IProducto> {
    const url = `${this.baseURL}/${id}`;
    const response: AxiosResponse<IProducto> = await axios.get(url);
    return response.data;
  }

  public async crearProducto(producto: IProducto): Promise<IProducto> {
    const url = `${this.baseURL}`;
    if (producto.id === 0) {
      producto.id = Date.now();
    }
    console.log("Datos que se envían:", producto);
    const response: AxiosResponse<IProducto> = await axios.post(url, producto);
    return response.data;
  }

  public async editarProducto(
    id: number,
    producto: IProducto
  ): Promise<IProducto> {
    const url = `${this.baseURL}/${id}`;
    const response: AxiosResponse<IProducto> = await axios.put(url, producto);
    return response.data;
  }

  public async eliminarProducto(id: number): Promise<void> {
    const url = `${this.baseURL}/${id}`;
    await axios.delete(url);
  }
}

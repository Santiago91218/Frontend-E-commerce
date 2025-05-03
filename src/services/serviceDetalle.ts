import axios, { AxiosResponse } from "axios";
const detalleService = import.meta.env.VITE_URL_DETALLE;

export class ServiceDetalle {
  private baseURL: string;

  constructor() {
    this.baseURL = detalleService;
  }

  public async getDetalleById(idDetalle: number) {
    const url = `${this.baseURL}/${idDetalle}`;
    const response = await axios.get(url);

    return response.data;
  }

  public async getDetallesGeneroProduct(
    generoProduct: string
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/genero-producto?generoProducto=${generoProduct}`;
    const response = await axios.get(url);

    return response.data;
  }

  public async getProductosRelacionados(
    tipoProducto: string,
    generoProduct: string,
    id: number
  ): Promise<AxiosResponse<any>> {
    const url = `${this.baseURL}/relacionados?tipo=${tipoProducto}&genero=${generoProduct}&id=${id}`;
    const response = await axios.get(url);
    return response.data;
  }
}

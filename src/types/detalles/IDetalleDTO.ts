import { IImagen } from "../IImagen";
import { IPrecio } from "../IPrecio";
import { IProducto } from "../IProducto";


export interface IDetalleDTO {
  producto: IProducto;
  precio: IPrecio;
  imagenPrincipal: IImagen;
}

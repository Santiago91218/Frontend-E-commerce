import { IImagen } from "../IImagen";
import { IPrecio } from "../IPrecio";
import { IProducto } from "../IProducto";


export interface IDetalleDTO {
  id:number
  producto: IProducto;
  precio: IPrecio;
  imagenPrincipal: IImagen;
}

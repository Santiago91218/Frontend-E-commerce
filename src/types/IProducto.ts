import { ICategoria } from "./ICategoria";

export interface IProducto {
  id: number;
  disponible: boolean;
  nombre: string;
  tipoProducto: TipoProducto;
  generoProducto: GeneroProducto;
  categoria: ICategoria;
}

export enum TipoProducto {
  REMERA = "REMERA",
  ZAPATILLAS = "ZAPATILLAS",
  BUZO = "BUZO",
  PANTALON = "PANTALON",
  CAMPERA = "CAMPERA",
}
export enum GeneroProducto {
  MASCULINO = "MASCULINO",
  FEMENINO = "FEMENINO",
  INFANTIL = "INFANTIL",
}

import { ICategoria } from "./ICategoria";

export interface IProducto {
  id: number;
  disponible: boolean;
  nombre: string;
  tipoProducto: TipoProducto;
  sexo: Sexo;
  categoria: ICategoria;
}

export enum TipoProducto {
  REMERA = "REMERA",
  ZAPATILLAS = "ZAPATILLAS",
  BUZO = "BUZO",
  PANTALON = "PANTALON",
  CAMPERA = "CAMPERA",
}
export enum Sexo {
  MASCULINO = "MASCULINO",
  FEMENINO = "FEMENINO",
}

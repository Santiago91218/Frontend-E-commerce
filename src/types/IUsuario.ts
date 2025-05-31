export interface IUsuario {
	id: number;
	nombre: string;
	email: string;
	rol: RolUsuario;
}

export enum RolUsuario {
	ADMINISTRADOR = "ADMINISTRADOR",
	CLIENTE = "CLIENTE",
}

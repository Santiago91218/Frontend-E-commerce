export interface IUsuario {
	id: number;
	nombre: string;
	apellido: string;
	email: string;
	rol: RolUsuario;
}

export enum RolUsuario {
	ADMIN = "ADMIN",
	EMPLEADO = "EMPLEADO",
	CLIENTE = "CLIENTE",
}

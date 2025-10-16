export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  estado: string;
  usuarioId: number;
  usuario: any | null;
}
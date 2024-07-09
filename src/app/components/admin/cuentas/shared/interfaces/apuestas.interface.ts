export interface Apuestas extends ApuestasForm {
  id: string;
  inputData: number;
  fecha: Date;
}

export interface ApuestasForm {
  idejecutor: string;
  inputData: number;
  fecha: Date;
}

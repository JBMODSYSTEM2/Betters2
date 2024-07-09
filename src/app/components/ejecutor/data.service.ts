import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, deleteDoc, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { getAuth } from 'firebase/auth';
import { BehaviorSubject, Observable, from } from 'rxjs';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }
  private data = new BehaviorSubject<number[]>([]);
  private total = new BehaviorSubject<number>(0);

  currentData = this.data.asObservable();
  currentTotal = this.total.asObservable();

  addData(inputData: number) {
    this.data.next([...this.data.getValue(), inputData]);
    this.total.next(this.total.getValue() + inputData);
  }

  // Agregar apuestas de trademate y betburger
  addApuestaBetburger(inputData: number) {
    const inputRef = collection(this.firestore, 'apuestas_betburger');
    return addDoc(inputRef, { inputData });
  }

  addApuestatrademate(inputData: number) {
    const inputRef = collection(this.firestore, 'apuestas_trademate');
    return addDoc(inputRef, { inputData });
  }

  // Obtener apuestas de trademate y betburger
  getApuestas(): Observable<{ id: string, inputData: number }[]> {
    const apuestasRef = collection(this.firestore, 'apuestas_betburger');
    return collectionData(apuestasRef, { idField: 'id' }) as unknown as Observable<{ id: string, inputData: number }[]>;
  }

  getApuestasTrademate(): Observable<{ id: string, inputData: number }[]> {
    const apuestasRef = collection(this.firestore, 'apuestas_trademate');
    return collectionData(apuestasRef, { idField: 'id' }) as unknown as Observable<{ id: string, inputData: number }[]>;
  }
  //Actualizar apuesta betburger
  updateApuesta(id: string, newInputData: number): Observable<void> {
    const apuestaRef = doc(this.firestore, 'apuestas_betburger', id.toString());
    return from(updateDoc(apuestaRef, { inputData: newInputData }));
  }

  updateApuestaTrademate(id: string, newInputData: number): Observable<void> {
    const apuestaRef = doc(this.firestore, 'apuestas_trademate', id.toString());
    return from(updateDoc(apuestaRef, { inputData: newInputData }));
  }

  deleteApuesta(id: string) {
    const apuestaRef = doc(this.firestore, 'apuestas', id);
    return deleteDoc(apuestaRef);
  }

  // Registro y Obtencion de Agente
  registrarAgente(formData: any) {
    const agentesRef = collection(this.firestore, 'agentes');
    return addDoc(agentesRef, formData);
  }

  getAgentes(): Observable<{ id: string, datosAgente: any }[]> {
    const agentesRef = collection(this.firestore, 'agentes');
    return collectionData(agentesRef, { idField: 'id' }) as unknown as Observable<{ id: string, datosAgente: number }[]>;
  }

  // Registro y Obtencion de Referido
  registrarReferido(formData: any, displayName: string) {
    formData.displayName = displayName;
    const referidosRef = collection(this.firestore, 'referidos');
    return addDoc(referidosRef, formData);
  }

  getUid(){
    const auth = getAuth();
    return auth.currentUser.uid;
  }

  getnombre(){
    const auth = getAuth();
    return auth.currentUser.displayName;
  }

  getReferidos(): Observable<{ id: string, datosReferido: any }[]> {
    const referidoRef = collection(this.firestore, 'referidos');
    return collectionData(referidoRef, { idField: 'id' }) as unknown as Observable<{ id: string, datosReferido: number }[]>;
  }


  // generateUniqueId(): string {
  //   return Math.random().toString(36).substr(2, 9);
  // }

}

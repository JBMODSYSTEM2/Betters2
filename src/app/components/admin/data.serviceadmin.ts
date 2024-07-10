// src/app/admin/data.service.ts

import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, collection, collectionData, updateDoc } from '@angular/fire/firestore';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from 'firebase/auth';
import { Observable } from 'rxjs';
import { Agente, Referido, Ejecutor } from '../../model/model.module';

@Injectable({
  providedIn: 'root'
})
export class DataServiceAdmin {

  constructor(private firestore: Firestore) { }

  registrarYCrearAgente(email: string, password: string, formData: any) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((credenciales) => {
        const user = credenciales.user;
        const agentesRef = doc(this.firestore, 'agentes', user.uid);
        setDoc(agentesRef, formData)
          .then(() => {
            console.log('Datos del agente almacenados con éxito.');
          })
          .catch((error) => {
            console.log('Error al almacenar los datos del agente: ', error);
          });
      })
      .catch((error) => {
        console.log('Error:', error.message);
      });
  }

  iniciarcongoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log('Error:', error.message);
      });
  }

  getUid() {
    const auth = getAuth();
    return auth.currentUser.uid;
  }

  // Nuevas funciones para referidos y ejecutores
  addReferido(referido: Referido) {
    const referidosRef = collection(this.firestore, 'referidos');
    return setDoc(doc(referidosRef, referido.id), referido);
  }

  getReferidos(): Observable<Referido[]> {
    const referidosRef = collection(this.firestore, 'referidos');
    return collectionData(referidosRef, { idField: 'id' }) as Observable<Referido[]>;
  }

  addEjecutor(ejecutor: Ejecutor) {
    const ejecutoresRef = collection(this.firestore, 'ejecutores');
    return setDoc(doc(ejecutoresRef, ejecutor.id), ejecutor);
  }

  getEjecutores(): Observable<Ejecutor[]> {
    const ejecutoresRef = collection(this.firestore, 'ejecutores');
    return collectionData(ejecutoresRef, { idField: 'id' }) as Observable<Ejecutor[]>;
  }

  asignarEjecutorAReferido(referidoId: string, ejecutorId: string) {
    const referidoRef = doc(this.firestore, 'referidos', referidoId);
    return updateDoc(referidoRef, { ejecutorId });
  }
}

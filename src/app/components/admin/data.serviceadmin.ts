import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithPopup, signOut, updateEmail, updateProfile } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class DataServiceAdmin {

  constructor(private firestore: Firestore) { }
  registrarYCrearAgente(email: string, password: string, formData: any){
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
    .then((credenciales) => {
      const user = credenciales.user;
      console.log(user)
      console.log(user.uid)

      // Almacenar todos los datos del formulario en Firestore
      const agentesRef = doc(this.firestore, 'agentes', user.uid);
      setDoc(agentesRef, formData)
      .then(() => {
        console.log('Datos del agente almacenados con éxito.');
      })
      .catch((error) => {
        console.log('Error al almacenar los datos del agente: ', error);
      });
    })
    .catch((error)=>{
      const codigoDeError = error.code;
      const mensajeDeError = error.message;
      console.log("--------------")
      console.log('Codigo: ',codigoDeError)
      console.log("--------------")
      console.log('Mensaje: ',mensajeDeError)
    })
  }

  iniciarcongoogle(){
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error)
    });
  }

  getUid(){
    const auth = getAuth();
    return auth.currentUser.uid;
  }
}

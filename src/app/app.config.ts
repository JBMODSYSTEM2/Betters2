import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { initializeApp } from "firebase/app";
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { initializeApp as initializeApp_alias, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtS_mYtsKoWdEUC2WyHQGOEfKsAf874_A",
  authDomain: "betterspoker.firebaseapp.com",
  projectId: "betterspoker",
  storageBucket: "betterspoker.appspot.com",
  messagingSenderId: "970846474659",
  appId: "1:970846474659:web:b6e98ac99033ac4e9f0a16"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideAnimations(),
    importProvidersFrom(
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
    ), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"betterspoker","appId":"1:970846474659:web:b6e98ac99033ac4e9f0a16","storageBucket":"betterspoker.appspot.com","apiKey":"AIzaSyAtS_mYtsKoWdEUC2WyHQGOEfKsAf874_A","authDomain":"betterspoker.firebaseapp.com","messagingSenderId":"970846474659"}))), importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
};

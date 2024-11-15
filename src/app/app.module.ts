import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({ "projectId": "clases-6", "appId": "1:496521316193:web:38d3724fa03201e92e6720", "storageBucket": "clases-6.firebasestorage.app", "apiKey": "AIzaSyCu77EaUsMBBM5wCUCc7MGdVJEgUiQsrwc", "authDomain": "clases-6.firebaseapp.com", "messagingSenderId": "496521316193", "measurementId": "G-WCJSMF326R" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())],
  bootstrap: [AppComponent],
})
export class AppModule { }

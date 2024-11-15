# Proyecto de Ionic con Firebase

Este proyecto es una aplicación móvil desarrollada con Ionic que se integra con Firebase para la autenticación de usuarios, almacenamiento en la nube y Firestore. A continuación, te guiaré a través del proceso completo, desde la configuración de Firebase hasta la generación de la APK para Android.

## Descripción del Proyecto

Este proyecto tiene como objetivo desarrollar una aplicación móvil utilizando Ionic y Angular, integrada con Firebase para manejar la autenticación de usuarios y el almacenamiento de datos en Firestore. Los usuarios pueden registrarse, iniciar sesión y subir imágenes mediante la cámara del dispositivo.

## Requisitos

Antes de comenzar, asegúrate de tener los siguientes requisitos instalados:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [Ionic](https://ionicframework.com/docs/intro/cli) (instalar mediante `npm install -g @ionic/cli`)
- [Angular](https://angular.io/)
- [Firebase](https://firebase.google.com/) (configurado y habilitado en tu consola)
- [Android Studio](https://developer.android.com/studio) para la compilación de APK

## Configuración de Firebase

### Paso 1: Crear un Proyecto en Firebase
1. Accede a la consola de Firebase y crea un nuevo proyecto. 
2. Haz clic en el ícono "Agregar Firebase a tu aplicación" y selecciona la opción de agregar Firebase a una aplicación web.
3. Anota las credenciales de Firebase, como `apiKey`, `authDomain`, `projectId`, etc.

### Paso 2: Configurar Firestore y Autenticación
1. En la consola de Firebase, habilita Firestore:
   - Ve a la pestaña **Base de datos** y crea una base de datos de Firestore.
   - Usa el modo de prueba de seguridad (puedes cambiarlo después para mayor seguridad).
   
2. Habilita la autenticación mediante correo electrónico y contraseña:
   - Ve a **Autenticación**, haz clic en "Empezar", y habilita el proveedor de **Correo electrónico/Contraseña**.

### Paso 3: Configurar Firebase en el Proyecto Ionic
1. Instala el paquete AngularFire:

    ```bash
    npm install firebase @angular/fire
    ```
2. Configura Firebase en el archivo src/environments/environment.ts con las credenciales obtenidas de Firebase:

    ```typescript
    export const environment = {
      production: false,
      firebase: {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: ''
      }
    };
    ```
3. Modifica src/app/app.module.ts para inicializar Firebase:

    ```typescript
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { RouteReuseStrategy } from '@angular/router';

    import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
    import { AppComponent } from './app.component';
    import { AppRoutingModule } from './app-routing.module';
    import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
    import { environment } from '../environments/environment';
    import { provideAuth, getAuth } from '@angular/fire/auth';
    import { provideFirestore, getFirestore } from '@angular/fire/firestore';
    import { provideStorage, getStorage } from '@angular/fire/storage';

    @NgModule({
      declarations: [AppComponent],
      imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage())
      ],
      providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
      bootstrap: [AppComponent]
    })
    export class AppModule {}
    ```
## Creación de la Aplicación en Ionic

### Paso 1: Crear un Proyecto Ionic

  Crea un nuevo proyecto Ionic utilizando el siguiente comando:

  ```bash
  ionic start devdacticFire blank --type=angular
  cd devdacticFire
  ```

### Paso 2: Crear Páginas y Servicios

  Genera las páginas y servicios necesarios:

  ```bash
  ionic g page login
  ionic g service services/auth
  ionic g service services/avatar
  ```

  Instala los paquetes necesarios para la cámara y los elementos PWA:

  ```bash
  npm install @capacitor/camera
  npm install @ionic/pwa-elements
  ```

  Agrega los elementos PWA a tu src/main.ts:

  ```typescript
  import { defineCustomElements } from '@ionic/pwa-elements/loader';
  defineCustomElements(window);
  ```

### Paso 3: Crear Páginas y Servicios

  Crea la lógica de autenticación en el archivo src/app/services/auth.service.ts para el registro, inicio de sesión y cierre de sesión de usuarios.

### Paso 4: Configurar el Enrutamiento

  En src/app/app-routing.module.ts, configura las rutas y protecciones para las páginas de inicio de sesión y de inicio de la aplicación:

  ```typescript
  import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

  const routes = [
    {
      path: '',
      loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
      ...canActivate(redirectLoggedInToHome)
    },
    {
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
      ...canActivate(redirectUnauthorizedToLogin)
    }
  ];
  ```
## Generación del APK

Para generar el archivo APK, ejecuta los siguientes comandos:

```bash
ionic build --prod
ionic cap add android
ionic cap open android
```

Desde Android Studio, selecciona Build > Build APK para generar el archivo APK que podrás instalar en tu dispositivo Android.

## Funcionamiento de la Aplicación en el Teléfono

Una vez instalada la APK, al ejecutar la aplicación en el teléfono:

1. Los usuarios pueden registrarse con su correo electrónico y contraseña.
2. Luego, pueden iniciar sesión en la aplicación.
3. La aplicación permite cargar imágenes utilizando la cámara del dispositivo.
4. Los usuarios autenticados pueden acceder a un área privada dentro de la aplicación, mientras que los usuarios no autenticados son redirigidos a la página de inicio de sesión.


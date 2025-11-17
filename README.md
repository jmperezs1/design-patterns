# Design-patterns

# Guía de ejecución de los tres proyectos (React, Flutter y React Native)

Este repositorio contiene tres implementaciones paralelas de patrones de diseño:
- Web (React)
- Móvil con Flutter
- Móvil con React Native

A continuación se detalla cómo instalar dependencias, configurar Android Studio (para móviles) y ejecutar cada proyecto, además de cómo navegar dentro de cada app.

---

## Estructura del repositorio

- `implementations/react`
- `implementations/flutter/design_patterns_flutter`
- `implementations/react-native/design-patterns-rn`

Trabaja siempre dentro de la carpeta del proyecto que vayas a ejecutar.

---

## Prerrequisitos comunes en Linux

- Git
- Terminal Bash/Zsh
- Conexión a Internet

Para proyectos móviles (Flutter y React Native):
- Android Studio + SDK de Android
- Emulador Android configurado (AVD)

Para proyectos web (React):
- Node.js LTS (y npm)

---

## Configuración de Android Studio (Linux)

1) Instalar Java (JDK 17 recomendado)

```bash
sudo apt-get update
sudo apt-get install -y openjdk-17-jdk
java -version
```

2) Instalar Android Studio
- Descarga desde: https://developer.android.com/studio
- Extrae e instala. Abre Android Studio y ejecuta el “Android Studio Setup Wizard” para instalar:
  - Android SDK
  - Android SDK Platform
  - Android Virtual Device (AVD)

3) Variables de entorno (ajusta rutas según tu instalación)
Añade a tu `~/.bashrc` o `~/.zshrc`:

```bash
# Android SDK
export ANDROID_HOME="$HOME/Android/Sdk"
export PATH="$PATH:$ANDROID_HOME/platform-tools"
export PATH="$PATH:$ANDROID_HOME/emulator"
export PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin"
```

4) Aceptar licencias del SDK

```bash
yes | sdkmanager --licenses
```

5) Crear y lanzar un emulador Android (alternativa vía CLI)
- Crea un AVD en Android Studio: Tools > Device Manager > Create device
- O desde CLI:

```bash
avdmanager create avd -n Pixel_API_34 -k "system-images;android-34;google_apis;x86_64"
emulator -avd Pixel_API_34
```

6) Verifica dispositivos disponibles

```bash
adb devices
```

---

## 1) React (Web)

Ruta del proyecto:

```bash
cd implementations/react
```

### Instalación
- Node.js LTS: https://nodejs.org
- Verifica:

```bash
node -v
npm -v
```

- Instala dependencias:

```bash
npm install
```

### Ejecución en desarrollo

```bash
npm run dev
```

- Abre la URL que imprime el dev server (típicamente http://localhost:3000 o http://localhost:5173).

### Build de producción (opcional)

```bash
npm run build
npm run start
```

### Cómo navegar en la app (React)
- La app lista los patrones de diseño por categorías (Creational, Structural, Behavioral).
- Desde la página principal, selecciona un patrón para abrir su pantalla:
  - Verás descripción, snippets y un “playground” interactivo (cuando aplique).
- Usa el menú/listado para cambiar entre patrones.

---

## 2) Flutter (Móvil)

Ruta del proyecto:

```bash
cd implementations/flutter/design_patterns_flutter
```

### Instalación de Flutter SDK
- Guía oficial: https://docs.flutter.dev/get-started/install/linux
- Verifica:

```bash
flutter doctor
```

Asegúrate de que:
- Flutter reconoce Android Studio y el SDK de Android
- Están resueltas las advertencias de flutter doctor

### Ejecutar en emulador Android
- Inicia un emulador desde Android Studio (o por CLI).
- Comprueba dispositivos:

```bash
flutter devices
```

- Ejecuta:

```bash
flutter run
```

Si tienes varios dispositivos/emuladores, especifica uno:

```bash
flutter run -d emulator-5554
```

### Cómo navegar en la app (Flutter)
- La pantalla principal muestra los patrones por categoría.
- Toca un patrón para abrir su pantalla:
  - Encontrarás explicación, código y un demo/playground interactivo.
- Usa la navegación superior/atrás para volver al listado y explorar otros patrones.

---

## 3) React Native (Móvil)

Ruta del proyecto:

```bash
cd implementations/react-native/design-patterns-rn
```

### Instalación

```bash
npm install
```

Nota: El proyecto puede ejecutarse con React Native CLI o con Expo (según la configuración). A continuación, se listan ambas opciones. En ambos casos, usa Android Studio para el emulador.

#### Opción A: React Native CLI
- Inicia el bundler y compila a Android:

```bash
# Metro Bundler (opcional si el script lo inicia automáticamente)
npx react-native start

# Compilar e instalar en el emulador Android (emulador debe estar corriendo)
npx react-native run-android
```

- Si existe script npm:

```bash
npm run android
```

#### Opción B: Expo (si el proyecto usa Expo)
- Inicia el servidor de desarrollo:

```bash
npm run start
# o
npx expo start
```

- Con el emulador Android iniciado, presiona “a” en la consola de Expo, o:

```bash
npx expo run:android
```

### Cómo navegar en la app (React Native)
- La pantalla inicial muestra un listado/registro de patrones (por categoría).
- Toca un patrón para abrir su demo:
  - Verás descripción, controles y un playground interactivo.
- Usa la navegación propia de la app (header/back) para volver y elegir otro patrón.

---

## Solución de problemas comunes

- No se detecta el SDK de Android:
  - Revisa variables de entorno ANDROID_HOME y PATH (ver sección Android Studio).
  - Ejecuta `flutter doctor` (en Flutter) o verifica que `adb devices` muestre el emulador.

- El emulador no arranca:
  - Habilita virtualización (Intel VT-x/AMD-V) en BIOS.
  - Usa imágenes del sistema recomendadas (Google APIs x86_64) y Android 33/34.

- Errores de dependencias en React/React Native:
  - Borra cachés y reinstala:

```bash
rm -rf node_modules
npm install
```

  - En RN, borra también cachés de Metro:

```bash
npm start -- --reset-cache
```

- Permisos/firmas en Android (RN/Flutter):
  - Asegúrate de tener las plataformas y build-tools correctas instaladas en el SDK.
  - Acepta licencias: `yes | sdkmanager --licenses`.

---

## Resumen rápido de comandos

- React (web):

```bash
cd implementations/react
npm install
npm run dev
```

- Flutter (móvil):

```bash
cd implementations/flutter/design_patterns_flutter
flutter doctor
flutter run
```

- React Native (móvil, CLI):

```bash
cd implementations/react-native/design-patterns-rn
npm install
npx react-native run-android
```

- React Native (móvil, Expo):

```bash
cd implementations/react-native/design-patterns-rn
npm install
npx expo start
# luego presiona "a" para abrir el emulador Android
```

Con esto deberías poder instalar, ejecutar y navegar los tres proyectos de manera consistente en Linux usando Android Studio para los entornos móviles.

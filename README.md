# Design-patterns

Repositorio monorepo con tres implementaciones paralelas de patrones de diseño:

- Web (React)
- Móvil con Flutter
- Móvil con React Native

Incluye demos interactivos, playgrounds y componentes UI modernos (Radix, shadcn/ui, Tailwind, etc.).

---

## Estructura del repositorio

- `implementations/react`
- `implementations/flutter/design_patterns_flutter`
- `implementations/react-native/design-patterns-rn`

Además, en el root hay un `package.json` con workspaces y scripts de ayuda para ejecutar los proyectos.

---

## Requisitos generales (Windows, macOS y Linux)

### Herramientas comunes
- Git  
- Terminal (PowerShell/CMD en Windows, Bash/Zsh en macOS y Linux)  
- Conexión a Internet  

### Para el proyecto Web (React)
- Node.js LTS + npm  
  Verifica:
  ```bash
  node -v
  npm -v
  ```

### Para los proyectos móviles (Flutter y React Native)
- Android Studio + Android SDK + AVD  
- Emulador Android o dispositivo físico  
- Flutter SDK (para Flutter)  
- Node.js + JDK + Android Studio (para React Native)

---

## Android Studio y Emuladores (Windows, macOS y Linux)

### 1. Instalar Java (JDK 17 recomendado)

Windows/macOS: Usa instaladores oficiales  
Linux:
```bash
sudo apt-get update
sudo apt-get install -y openjdk-17-jdk
java -version
```

### 2. Instalar Android Studio
- Descarga desde la página oficial.
- Ejecuta el asistente e instala:
  - Android SDK  
  - Android SDK Platform  
  - AVD Manager  

### 3. Variables de entorno (Linux)

```bash
export ANDROID_HOME="$HOME/Android/Sdk"
export PATH="$PATH:$ANDROID_HOME/platform-tools"
export PATH="$PATH:$ANDROID_HOME/emulator"
export PATH="$PATH:$ANDROID_HOME/cmdline-tools/latest/bin"
```

### 4. Aceptar licencias
```bash
yes | sdkmanager --licenses
```

### 5. Crear emulador

Desde Android Studio:  
`Tools > Device Manager > Create Device`

CLI:
```bash
avdmanager create avd -n Pixel_API_34 -k "system-images;android-34;google_apis;x86_64"
emulator -avd Pixel_API_34
```

### 6. Ver dispositivos
```bash
adb devices
```

---

## Scripts del root del monorepo

En el root tienes:

```jsonc
"scripts": {
  "dev:web": "npm run dev -w implementations/react",
  "build:web": "npm run build -w implementations/react",
  "storybook": "npm run storybook -w implementations/react",
  "flutter:run": "bash -lc 'cd implementations/flutter/design_patterns_flutter && flutter run'",
  "rn:android_run": "bash -lc 'cd implementations/react-native/design-patterns-rn && npm run android'"
}
```
---
## Instalar dependencias
## 1) React (Web)

```bash
cd implementations/react
npm install
```

Navegación:
- Lista de patrones por categorías
- Página con teoría + snippet + playground

---

## 2) Flutter (Móvil)

RUTA:

```bash
cd implementations/flutter/design_patterns_flutter
```

Instalación:
```bash
flutter doctor
flutter pub get
```

Navegación:
- Lista de patrones
- Demo interactivo por patrón

---

## 3) React Native (Móvil)

RUTA:

```bash
cd implementations/react-native/design-patterns-rn
npm install
```
Navegación:
- Lista de patrones
- Playground interactivo en cada pantalla

---

## Ejecución desde el root del proyecto

### 1) React Stoybook:
```bash
npm run storybook
```
### 2) Flutter:
Flutter:
```bash
npm run flutter:run
```

### 3 )React Native:
```bash
npm run rn:android_run

## Solución de problemas frecuentes

### SDK no detectado
- Revisar ANDROID_HOME
- Revisar instalación del SDK en Android Studio
- Ejecutar:
```bash
adb devices
```

### Licencias

| Librería | Licencia |
|---------|----------|
| Radix UI / Icons | MIT |
| shadcn/ui | MIT |
| React | MIT |
| Tailwind CSS | MIT |



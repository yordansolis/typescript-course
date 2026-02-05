# Curso de React Native - Expo

---

## Estructura Ideal de un Componente React

> Referencia rapida: abre esto cuando estes codificando y no recuerdes el orden.

### Orden y para que sirve cada parte

| #  | Seccion              | Para que sirve                                                        |
|----|----------------------|-----------------------------------------------------------------------|
| 1  | **Imports**          | Traer todo lo que necesitas (hooks, componentes, estilos, utilidades) |
| 2  | **Tipos/Interfaces** | Definir la forma de los datos que recibe tu componente (props)        |
| 3  | **Componente**       | La funcion principal que React va a renderizar                        |
| 4  | **Hooks**            | Estado local (`useState`) y valores derivados (`useMemo`, etc.)       |
| 5  | **Efectos**          | Codigo que se ejecuta cuando algo cambia (`useEffect`)                |
| 6  | **Funciones**        | Logica y handlers de eventos (onClick, onChange, etc.)                |
| 7  | **JSX**              | Lo que el usuario ve en pantalla (el return)                          |

### Diagrama UML - Orden de un Componente React

```
┌─────────────────────────────────────────────────────┐
│              Archivo MiComponente.tsx                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. IMPORTS                                         │
│  ┌───────────────────────────────────────────────┐  │
│  │ import { useState, useEffect } from "react"   │  │
│  │ import { MiServicio } from "../services"       │  │
│  └───────────────────────┬───────────────────────┘  │
│                          │                          │
│                          ▼                          │
│  2. TIPOS / INTERFACES                              │
│  ┌───────────────────────────────────────────────┐  │
│  │ interface Props {                              │  │
│  │   title: string                                │  │
│  │ }                                              │  │
│  └───────────────────────┬───────────────────────┘  │
│                          │                          │
│                          ▼                          │
│  3. COMPONENTE (funcion principal)                  │
│  ┌───────────────────────────────────────────────┐  │
│  │ export function MiComponente({ title }: Props) │  │
│  │ {                                              │  │
│  │                                                │  │
│  │   4. HOOKS ──────────► useState, useContext     │  │
│  │         │                                      │  │
│  │         ▼                                      │  │
│  │   5. EFECTOS ────────► useEffect               │  │
│  │         │                                      │  │
│  │         ▼                                      │  │
│  │   6. FUNCIONES ──────► handlers, logica        │  │
│  │         │                                      │  │
│  │         ▼                                      │  │
│  │   7. JSX (return) ──► Lo que se ve en pantalla │  │
│  │                                                │  │
│  │ }                                              │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Separacion de archivos - Cuando el proyecto crece

> No metas todo en un solo archivo. Separa por responsabilidad para que sea facil encontrar las cosas.

| Carpeta           | Que va ahi                                    | Ejemplo                          |
|-------------------|-----------------------------------------------|----------------------------------|
| `components/`     | Piezas de UI reutilizables                    | `Button.tsx`, `Card.tsx`         |
| `screens/` o `pages/` | Pantallas completas (una por ruta)       | `LoginScreen.tsx`, `Home.tsx`    |
| `hooks/`          | Hooks personalizados (logica reutilizable)    | `useAuth.ts`, `useForm.ts`      |
| `context/`        | Providers y contextos globales                | `AuthContext.tsx`, `ThemeContext.tsx` |
| `services/` o `api/` | Llamadas a APIs y logica de red           | `authService.ts`, `userApi.ts`  |
| `interfaces/`     | Tipos e interfaces compartidos                | `User.ts`, `Product.ts`         |
| `utils/`          | Funciones auxiliares puras                    | `formatDate.ts`, `validators.ts`|
| `styles/`         | Estilos globales o temas                      | `theme.ts`, `globalStyles.ts`   |

### Diagrama UML - Estructura de carpetas

```
┌─────────────────────────────────────────────────────────────┐
│                        src/                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐   importa tipos   ┌─────────────────┐     │
│  │ interfaces/ │◄──────────────────│   components/    │     │
│  │             │                    │                  │     │
│  │ User.ts     │◄────────┐         │ Button.tsx       │     │
│  │ Product.ts  │         │         │ Card.tsx         │     │
│  └─────────────┘         │         └────────┬─────────┘     │
│                          │                  │ usa            │
│                          │                  ▼                │
│  ┌─────────────┐         │         ┌─────────────────┐      │
│  │  services/  │         │         │    screens/      │      │
│  │             │         │         │                  │      │
│  │ authApi.ts  │◄────────┼─────────│ LoginScreen.tsx  │      │
│  │ userApi.ts  │         │         │ HomeScreen.tsx   │      │
│  └─────────────┘         │         └────────┬─────────┘      │
│                          │                  │ consume         │
│                          │                  ▼                │
│  ┌─────────────┐         │         ┌─────────────────┐      │
│  │   hooks/    │         │         │    context/      │      │
│  │             │─────────┘         │                  │      │
│  │ useAuth.ts  │◄──────────────────│ AuthContext.tsx   │      │
│  │ useForm.ts  │                   │ ThemeContext.tsx  │      │
│  └─────────────┘                   └─────────────────┘      │
│                                                             │
│  ┌─────────────┐                   ┌─────────────────┐      │
│  │   utils/    │                   │    styles/       │      │
│  │             │                   │                  │      │
│  │ formatDate  │                   │ theme.ts         │      │
│  │ validators  │                   │ globalStyles.ts  │      │
│  └─────────────┘                   └─────────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Flujo de dependencias:
  screens ──► components ──► hooks ──► services ──► interfaces
                  │                       │
                  └───────► context ◄─────┘
                               │
                            utils / styles
```

### Ejemplo completo - Componente con archivos separados

**`interfaces/User.ts`** - Solo el tipo
```ts
export interface User {
  id: number
  name: string
  email: string
}
```

**`services/userApi.ts`** - Solo la llamada al API
```ts
import { User } from "../interfaces/User"

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch("https://api.example.com/users")
  return res.json()
}
```

**`hooks/useUsers.ts`** - Solo la logica
```ts
import { useState, useEffect } from "react"
import { User } from "../interfaces/User"
import { getUsers } from "../services/userApi"

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    getUsers().then(setUsers)
  }, [])

  return { users }
}
```

**`components/UserList.tsx`** - Solo la UI
```tsx
import { useUsers } from "../hooks/useUsers"

export function UserList() {
  const { users } = useUsers()

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  )
}
```

> **Regla simple:** Si un archivo tiene mas de 150 lineas, probablemente puedes separarlo.

---

|                               |                               |
|:-----------------------------:|:-----------------------------:|
| [React Native](https://reactnative.dev/) | [Expo](https://docs.expo.dev/) |
| [Docs React Native](https://reactnative.dev/) | [Docs Expo](https://docs.expo.dev/) |

Esta es la lista de instalaciones recomendadas para el curso de React Native, si encuentran enlaces adicionales o cambios en esta hoja, pueden hacerlos.

## Instalaciones Necesarias

- [Visual Studio Code](https://code.visualstudio.com/)
- [Postman](https://www.postman.com/downloads/)
- [Git](https://git-scm.com/)

```bash
git config --global user.name "Tu nombre"
git config --global user.email "Tu correo"
```

- [Node](https://nodejs.org/es/)
- [Android Studio](https://developer.android.com/studio)
- [XCode - SOLO en MAC OSX](https://apps.apple.com/ca/app/xcode/id497799835)
- Expo Go
  - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [IOS](https://apps.apple.com/us/app/expo-go/id982107779)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Extensiones de VSCode

- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
- [ES7 React/Redux](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [Simple React Snippets](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets)
- [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
- [Paste JSON as Code](https://marketplace.visualstudio.com/items?itemName=quicktype.quicktype)
- [Tailwind CSS InteliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Colorize](https://marketplace.visualstudio.com/items?itemName=kamikillerto.vscode-colorize)

### Temas que estoy usando en VSCode

- [Tokyo Night](https://marketplace.visualstudio.com/items?itemName=enkia.tokyo-night)
- [Iconos - Bearded Icons](https://marketplace.visualstudio.com/items?itemName=BeardedBear.beardedicons)

### Mis wallpapers

- [Wallpapers Developer](https://drive.google.com/drive/folders/1ItU8rbSGJjnh2USOBGwaCo9nYKifPJ6m?usp=sharing)

## Comunidad de Discord

[Únete a la comunidad de Discord](https://discord.com/invite/fNp7KRDkke)


# Libreria para trabajar con formulario:
1 https://formik.org/docs/overview

2 https://react-hook-form.com/ ->  npm install formik --save
 

# typescript-course

Curso de TypeScript con React

---

## React Context - Explicacion

### ¿Que es Context?

Imagina que tienes una familia en una casa de 3 pisos:

```
Casa (App)
├── Piso 3 (Abuelo)
│   └── Piso 2 (Papa)
│       └── Piso 1 (Hijo)
│           └── Sotano (Nieto)
```

### El problema SIN Context (Prop Drilling)

Si el **Abuelo** quiere pasarle un mensaje al **Nieto**, tiene que pasarlo asi:

```
Abuelo → Papa → Hijo → Nieto
```

En codigo seria:

```tsx
<Abuelo usuario="Juan">
  <Papa usuario="Juan">      {/* Papa no lo necesita, solo lo pasa */}
    <Hijo usuario="Juan">    {/* Hijo no lo necesita, solo lo pasa */}
      <Nieto usuario="Juan"> {/* El unico que lo usa! */}
```

Esto se llama **"prop drilling"** (taladrar props) y es muy molesto cuando tienes muchos niveles.

---

### La solucion CON Context

El Context es como un **WiFi** en la casa. El Abuelo pone la informacion en el aire, y cualquiera puede acceder a ella directamente:

```
Abuelo (transmite por WiFi) -----> Nieto (se conecta directo)
```

En codigo:

```tsx
// El Abuelo "transmite"
<AuthProvider>   {/* Pone el WiFi */}
  <Papa>
    <Hijo>
      <Nieto />  {/* Se conecta directo con useAuthContext() */}
```

```tsx
// En el componente Nieto:
const { username } = useAuthContext();  // Acceso directo!
```

---

### ¿Cuando usar Context?

| Usa Context para:       | NO uses Context para:                 |
|-------------------------|---------------------------------------|
| Usuario logueado        | Datos de un solo componente           |
| Tema (claro/oscuro)     | Props que solo bajan 1-2 niveles      |
| Idioma de la app        | Todo (no abuses)                      |
| Carrito de compras      |                                       |

---

### Estructura de un Context

```tsx
// 1. Crear el contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Crear el hook personalizado para usarlo
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de AuthProvider");
  }
  return context;
};

// 3. Crear el Provider que envuelve la app
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

### Resumen

> **Context = Compartir datos entre componentes sin tener que pasarlos uno por uno como props.**

---

## Diagramas UML - AuthContext

### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────────┐
│                         AuthProvider                             │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Estado (useState)                       │  │
│  │  ┌─────────────────┐    ┌─────────────────┐               │  │
│  │  │ isLoggedIn:     │    │ username:       │               │  │
│  │  │ boolean         │    │ string          │               │  │
│  │  └─────────────────┘    └─────────────────┘               │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Funciones                               │  │
│  │  ┌─────────────────┐    ┌─────────────────┐               │  │
│  │  │ login(name)     │    │ logout()        │               │  │
│  │  └─────────────────┘    └─────────────────┘               │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              ▼                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │              AuthContext.Provider                          │  │
│  │         value={{ isLoggedIn, username, login, logout }}    │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              ▼                                   │
│                         {children}                               │
└─────────────────────────────────────────────────────────────────┘
```

---

### Diagrama de Clases (Interface)

```
┌────────────────────────────────────┐
│       <<interface>>                │
│       AuthContextType              │
├────────────────────────────────────┤
│ + isLoggedIn: boolean              │
│ + username: string                 │
├────────────────────────────────────┤
│ + login(name: string): void        │
│ + logout(): void                   │
└────────────────────────────────────┘
                 △
                 │ implementa
                 │
┌────────────────────────────────────┐
│          AuthProvider              │
├────────────────────────────────────┤
│ - isLoggedIn: boolean              │
│ - username: string                 │
├────────────────────────────────────┤
│ + login(name: string): void        │
│ + logout(): void                   │
│ + render(): JSX.Element            │
└────────────────────────────────────┘
```

---

### Diagrama de Secuencia (Login)

```
     Usuario          Componente         useAuthContext        AuthProvider
        │                  │                   │                    │
        │  click login     │                   │                    │
        │─────────────────>│                   │                    │
        │                  │                   │                    │
        │                  │  login("Juan")    │                    │
        │                  │──────────────────>│                    │
        │                  │                   │                    │
        │                  │                   │  login("Juan")     │
        │                  │                   │───────────────────>│
        │                  │                   │                    │
        │                  │                   │                    │ setIsLoggedIn(true)
        │                  │                   │                    │ setUsername("Juan")
        │                  │                   │                    │
        │                  │                   │   re-render        │
        │                  │<──────────────────────────────────────│
        │                  │                   │                    │
        │  UI actualizada  │                   │                    │
        │<─────────────────│                   │                    │
```

---

### Diagrama de Arbol de Componentes

```
                    ┌─────────────┐
                    │     App     │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │ AuthProvider │ ◄── Provee el contexto
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
    │   Navbar    │ │    Main     │ │   Footer    │
    └──────┬──────┘ └──────┬──────┘ └─────────────┘
           │               │
           │        ┌──────▼──────┐
           │        │   Profile   │ ◄── useAuthContext()
           │        └─────────────┘
           │
    ┌──────▼──────┐
    │ LoginButton │ ◄── useAuthContext()
    └─────────────┘


    ════════════════════════════════════════════════
    Cualquier componente dentro de AuthProvider
    puede acceder al contexto con useAuthContext()
    ════════════════════════════════════════════════
```

---

### Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ┌─────────┐    createContext     ┌──────────────────┐    │
│   │ React   │ ──────────────────►  │   AuthContext    │    │
│   └─────────┘                      │   (la pizarra)   │    │
│                                    └────────┬─────────┘    │
│                                             │              │
│                                             ▼              │
│   ┌─────────────────────────────────────────────────────┐  │
│   │                  AuthProvider                        │  │
│   │                                                      │  │
│   │   Estado:  isLoggedIn ←──┐      ┌──► username       │  │
│   │                          │      │                    │  │
│   │   Acciones: login() ─────┴──────┘    logout()       │  │
│   │                                                      │  │
│   └─────────────────────────┬───────────────────────────┘  │
│                             │                              │
│                             ▼                              │
│   ┌─────────────────────────────────────────────────────┐  │
│   │              useAuthContext()                        │  │
│   │                                                      │  │
│   │   Retorna: { isLoggedIn, username, login, logout }  │  │
│   │                                                      │  │
│   └─────────────────────────────────────────────────────┘  │
│                             │                              │
│                             ▼                              │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│   │ Componente  │  │ Componente  │  │ Componente  │       │
│   │      A      │  │      B      │  │      C      │       │
│   └─────────────┘  └─────────────┘  └─────────────┘       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```



# Diagrama UML - Sistema de Autenticación con Context API

## Diagrama de Clases
```
┌─────────────────────────────────────┐
│         AuthStatus (Enum)           │
├─────────────────────────────────────┤
│ + Checking: "checking"              │
│ + Authenticated: "authenticated"    │
│ + Unauthenticated: "unauthenticated"│
└─────────────────────────────────────┘
                  ▲
                  │
                  │ uses
                  │
┌─────────────────────────────────────┐
│    AuthContextType (Interface)      │
├─────────────────────────────────────┤
│ + isLoggedIn: boolean               │
│ + username: string                  │
│ + status: AuthStatus                │
│ + login(name: string): void         │
│ + logout(): void                    │
└─────────────────────────────────────┘
                  ▲
                  │
                  │ implements
                  │
┌─────────────────────────────────────┐
│        AuthProvider (Component)     │
├─────────────────────────────────────┤
│ - isLoggedIn: boolean               │
│ - username: string                  │
│ - status: AuthStatus                │
├─────────────────────────────────────┤
│ + login(name: string): void         │
│ + logout(): void                    │
└─────────────────────────────────────┘
                  │
                  │ provides
                  │
                  ▼
┌─────────────────────────────────────┐
│         AuthContext                 │
│      (React Context)                │
└─────────────────────────────────────┘
                  │
                  │ consumed by
                  │
                  ▼
┌─────────────────────────────────────┐
│    useAuthContext() (Hook)          │
├─────────────────────────────────────┤
│ Returns: AuthContextType            │
│ Throws: Error if outside Provider   │
└─────────────────────────────────────┘
                  │
                  │ used by
                  │
                  ▼
┌─────────────────────────────────────┐
│     LoginPage (Component)           │
├─────────────────────────────────────┤
│ Uses:                               │
│ - status                            │
│ - login()                           │
│ - logout()                          │
│ - isLoggedIn                        │
└─────────────────────────────────────┘
```

## Diagrama de Flujo de Datos
```
┌──────────────┐
│    App       │
└──────┬───────┘
       │
       │ wraps
       │
       ▼
┌──────────────────────┐
│   AuthProvider       │
│  ┌────────────────┐  │
│  │ State:         │  │
│  │ - isLoggedIn   │  │
│  │ - username     │  │
│  │ - status       │  │
│  └────────────────┘  │
└──────┬───────────────┘
       │
       │ provides context
       │
       ▼
┌──────────────────────┐
│   LoginPage          │
│  ┌────────────────┐  │
│  │ Reads:         │  │
│  │ - status       │  │
│  │ - isLoggedIn   │  │
│  │                │  │
│  │ Calls:         │  │
│  │ - login()      │  │
│  │ - logout()     │  │
│  └────────────────┘  │
└──────────────────────┘
```

## Diagrama de Secuencia - Login
```
Usuario          LoginPage       useAuthContext      AuthProvider
  │                 │                   │                 │
  │  Click Login    │                   │                 │
  ├────────────────>│                   │                 │
  │                 │  useAuthContext() │                 │
  │                 ├──────────────────>│                 │
  │                 │                   │  getContext()   │
  │                 │                   ├────────────────>│
  │                 │                   │<────────────────┤
  │                 │<──────────────────┤                 │
  │                 │   login("name")   │                 │
  │                 ├──────────────────────────────────────>│
  │                 │                   │  setIsLoggedIn(true)
  │                 │                   │  setUsername("name")
  │                 │                   │  setStatus("authenticated")
  │                 │<──────────────────────────────────────┤
  │                 │   Re-render       │                 │
  │  UI Updated     │                   │                 │
  │<────────────────┤                   │                 │
```

## Diagrama de Secuencia - Logout
```
Usuario          LoginPage       useAuthContext      AuthProvider
  │                 │                   │                 │
  │  Click Logout   │                   │                 │
  ├────────────────>│                   │                 │
  │                 │   logout()        │                 │
  │                 ├──────────────────────────────────────>│
  │                 │                   │  setIsLoggedIn(false)
  │                 │                   │  setUsername("")
  │                 │                   │  setStatus("unauthenticated")
  │                 │<──────────────────────────────────────┤
  │                 │   Re-render       │                 │
  │  UI Updated     │                   │                 │
  │<────────────────┤                   │                 │
```

## Diagrama de Estados
```
         ┌─────────────┐
         │  checking   │ (Estado inicial)
         └──────┬──────┘
                │
                │ app carga
                │
       ┌────────┴────────┐
       │                 │
       ▼                 ▼
┌──────────────┐  ┌──────────────┐
│unauthenticated│  │authenticated │
└──────┬───────┘  └──────┬───────┘
       │                 │
       │   login()       │
       ├────────────────>│
       │                 │
       │   logout()      │
       │<────────────────┤
       │                 │
```

## Resumen de Responsabilidades

| Componente        | Responsabilidad                              |
|-------------------|----------------------------------------------|
| AuthStatus        | Define estados posibles de autenticación     |
| AuthContextType   | Define el contrato del contexto             |
| AuthContext       | Almacena y distribuye el estado global      |
| AuthProvider      | Maneja el estado y lógica de autenticación  |
| useAuthContext    | Hook para acceder al contexto de forma segura|
| LoginPage         | UI que consume el contexto y dispara acciones|

#Diagrama de Secuencia UML
Explicación de handleSubmit en React Hook Form
 
```
┌─────────┐          ┌──────────────┐          ┌─────────────┐          ┌──────────┐
│ Usuario │          │    <form>    │          │handleSubmit │          │ onSubmit │
└────┬────┘          └──────┬───────┘          └──────┬──────┘          └────┬─────┘
     │                      │                         │                      │
     │  1. Click "Ingresar" │                         │                      │
     │─────────────────────>│                         │                      │
     │                      │                         │                      │
     │                      │  2. Dispara evento      │                      │
     │                      │     onSubmit            │                      │
     │                      │────────────────────────>│                      │
     │                      │                         │                      │
     │                      │                         │  3. Previene envío   │
     │                      │                         │     por defecto      │
     │                      │                         │  (preventDefault)    │
     │                      │                         │                      │
     │                      │                         │  4. Valida campos    │
     │                      │                         │  (required, etc.)    │
     │                      │                         │                      │
     │                      │                         │        ┌─────────────┴─────────────┐
     │                      │                         │        │  ¿Validación exitosa?     │
     │                      │                         │        └─────────────┬─────────────┘
     │                      │                         │                      │
     │                      │                         │  5. SI: Llama a      │
     │                      │                         │     onSubmit con     │
     │                      │                         │     los datos        │
     │                      │                         │─────────────────────>│
     │                      │                         │                      │
     │                      │                         │                      │  6. Ejecuta
     │                      │                         │                      │  console.log(myForm)
     │                      │                         │                      │
     │                      │                         │  NO: Muestra errores │
     │                      │                         │<─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│
     │                      │                         │                      │

```



## EXPO
 npx create-expo-app@latest testing-app --template  blank-typescript



 comando para iniciar:
 unset CI && npm start




# Temas puntuales 
Para iniciar un proyecto de React Native: https://docs.expo.dev/more/create-expo/#--template 

si queremos instalar el proyecto con un template:  npx create-expo-app@latest --templat  name 

- TouchableOpacity

- Pressable

- StatusBar

- Views

- StyleSheet

- Text




*(Ver seccion "Estructura Ideal de un Componente React" al inicio del README)*

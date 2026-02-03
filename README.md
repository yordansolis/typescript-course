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
import { type PropsWithChildren, createContext, useContext, useState } from "react";

const AuthStatus = {
    Checking: "checking",
    Authenticated: "authenticated",
    Unauthenticated: "unauthenticated",
} as const; // use as cost so that each value is exact liteal 

// This create a TypeScript based on the values of the previous objet.
type AuthStatus = (typeof AuthStatus)[keyof typeof AuthStatus];


// 1. We define what  information our "board" will have
interface AuthContextType {
    isLoggedIn: boolean;
    username: string;
    email: string;
    login: (name: string, email: string) => void;
    logout: () => void;
    status: AuthStatus;
}


// 2. We created the "board" with initial values

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Shortcut to read the whiteboard from any component
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within AuthProvider");
    }
    return context;
};

// 4. The "dad/mom" who handles the blackboard and wraps up the children
export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<AuthStatus>(AuthStatus.Unauthenticated);

    const login = (nameValue: string, emailValue: string) => {
        // Mostrar "checking" mientras simula la petición
        setStatus(AuthStatus.Checking);

        // Simular petición a base de datos (5 segundos)
        setTimeout(() => {
            setIsLoggedIn(true);
            setUsername(nameValue);
            setEmail(emailValue);
            setStatus(AuthStatus.Authenticated);
        }, 5000);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUsername("");
        setEmail("");
        setStatus(AuthStatus.Unauthenticated);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, email, login, logout, status }}>
            {children}
        </AuthContext.Provider>
    );
};

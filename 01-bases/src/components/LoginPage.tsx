import { useAuthContext } from "../context/AuthContext"


export const LoginPage = () => {

    const { status, login, logout, isLoggedIn, username, email } = useAuthContext();

    const isLoading = status === "checking";

    return (
        <>
            <h3>login 😁</h3>

            <span>Status: {status}</span>
            <br />

            <span>Name: {username}</span>
            <br />
            <span>Email: {email}</span>
            <br />

            {isLoading && (
                <div style={{
                    marginTop: '10px',
                    padding: '15px',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    borderRadius: '5px',
                    fontWeight: 'bold'
                }}>
                    ⏳ Conectando con el servidor...
                </div>
            )}
            <br />

            {isLoggedIn ? (
                <button onClick={logout}>Logout</button>
            ) : (
                <button
                    onClick={() => login("JhordanS", "jordan@gmail.com")}
                    disabled={isLoading}
                >
                    {isLoading ? "Cargando..." : "Login"}
                </button>
            )}
        </>
    )
}

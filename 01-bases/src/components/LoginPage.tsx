import { useAuthContext } from "../context/AuthContext"


export const LoginPage = () => {

    const { status, login, logout, isLoggedIn, username, email, loginWithEmailPassword } = useAuthContext();

    const isLoading = status === "checking";

    return (
        <div>
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
                    backgroundColor: '#4A90E2',
                    color: 'white',
                    borderRadius: '5px',
                    fontWeight: 'bold'
                }}>
                    ⏳ Conectando con el servidor...
                </div>
            )}
            <br />

            {
                isLoggedIn ? (
                    <>
                        <h5> Ingresa a la app 👋</h5>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <button
                        // onClick={() => login("JhordanS", "jordan@gmail.com")}
                        onClick={() => loginWithEmailPassword("jordan@gmail.com", "123456")}
                        disabled={isLoading}
                    >
                        {isLoading ? "Cargando..." : "Login"}
                    </button>
                )
            }
        </div>
    )
}


// import { BasicTypes } from './typescript/BasicTypes'
// import { ObjectLiterals } from './typescript/ObjectLiterals'
// import { BasicFuctions } from './typescript/BasicFuctions'
// import { Counter } from './components/Counter'

import { AuthProvider } from "./context/AuthContext"




import './App.css'
import { LoginPage } from "./components/LoginPage"

function App() {
  return (
    <AuthProvider>
      <h1 className='text-3xl font-bold underline flex-col'>Hola Mundo desde React</h1>
      {/* <BasicTypes /> */}
      {/* <ObjectLiterals /> */}
      {/* <BasicFuctions /> */}
      {/* <Counter /> */}

      <LoginPage />

    </AuthProvider>
  )
}

export default App

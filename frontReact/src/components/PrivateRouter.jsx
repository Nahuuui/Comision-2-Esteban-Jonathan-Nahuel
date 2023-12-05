import { useContext, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "../providers/AuthProvider"

function PrivateRouter() {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect( () => {
        if (auth === null) {
            navigate("/users/login")            // Si el usuario no tiene autenticacion, me manda a "http://localhost:5173/users/login"
        }
        
    }, [auth, navigate])

    if (auth === undefined ) return <div>Loading...</div>


  return (<Outlet/>)                   // el Outlet es como un children pero para las rutas

}

export default PrivateRouter
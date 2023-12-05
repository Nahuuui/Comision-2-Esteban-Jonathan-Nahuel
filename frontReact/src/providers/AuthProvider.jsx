// aca es donde haremos para crear las rutas privadas
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

// escribimos rfce
function AuthProvider({ children }) {
  // paso 1
  const [auth, setAuth] = useState(undefined);

  const login = ({ user, token }) => {
    setAuth({ user, token }); // ojo aca
    localStorage.setItem("token", token); // guardamos el token
    localStorage.setItem("user", JSON.stringify(user)); // guardamos el usuario
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuth(null);
  };

  // paso 2
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // transformamos el usuario q estaba en formato json a formato de javascrip
    const token = localStorage.getItem("token");

    // si no tenemos ninguno de los dos campos en el localStorage borramos todo
    if (!user || !token) {
      // si no tengo el usuario o el token
      // borramos el user y el token
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setAuth(null);

      return;
    } else {
      setAuth({ user, token });
    }
  }, []);

  // paso 1
  // paso 2 (se ejecuta de vuelta despues del useEffect), se vuelve a ejecutar pq se renderiza cada vez q cambie el estado dentro del componente
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
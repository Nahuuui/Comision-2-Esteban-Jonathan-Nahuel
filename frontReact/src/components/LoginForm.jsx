import { useRef } from "react";
import { API_URL } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const LoginForm = () => {
  const ref = useRef(null);

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");

    const user = {
      username,
      password,
    };

    const req = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (req.status != 200) return console.error("Error al iniciar sesion"); // manejo de error

    const res = await req.json();
    login(res);

    navigate('/');
    ref.current.reset();
  };

  return (
    <div>
      <h1 className=" text-center text-5xl font-extrabold white:text-white text-white mb-6">
        Iniciar sesion
      </h1>
      <form onSubmit={handleSubmit} ref={ref} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white dark:text-white">
            Usuario
          </label>
          <input
            type="text"
            name="username"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Usuario"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-white dark:text-white">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="********"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Iniciar sesion
        </button>

        <div className="mt-4 text-white dark:text-white">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/users/register"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Registrarme!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
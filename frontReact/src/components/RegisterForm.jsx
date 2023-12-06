import { useRef } from "react"; // useRef para q despues de apretar en el boton register, se resete los campos
import { useNavigate } from "react-router-dom"; // useNavigate para redericcionar hacia otra pagina a la fuerza
import { API_URL } from "../utils/consts";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const ref = useRef(null); // creo el ref para dentro guardar en useRef(null) para luego aplicarle el metodo rest y se borre los datos puestos en el form

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); // con esto obtenemos todo la informacion del backend

    // accedo a cada informacion de mi backend
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");
    const avatar = formData.get("avatarURL");

    // guardo toda la informacion en un objeto (mas organizado)
    const user = {
      username,
      password,
      email,
      avatar,
    };

    const req = await fetch(`${API_URL}/users/register`, {
      // acuerdese q el fetch es para traer informacion desde una url
      method: "POST", // queremos hacer un post
      body: JSON.stringify(user), // al body le enviamos el objeto user q habiamos sacado del formulario pero en formato json, ya q en el body del postman recibe en formato json
      headers: {
        "Content-Type": "application/json",
      },
    });

    // como en mi ctrlRegisterUser maneja un 201 en caso de crear una cuenta correctamente
    if (req.status != 201) return console.error("Error al registrar usuario"); // manejo de error

    // para verificar si funciono correctamente
    const res = await req.json(); // guardamos la peticion de informacion (user, password, etc)  q hicimos en formato json dentro de la var res
    console.log(res);

    navigate("/users/login");
    ref.current.reset(); // esto nos sirve para resetear el formulario una vez haya hecho click en registrarse
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-white-900 dark:text-white mb-4 text-white">
          Registrarse
        </h1>
        <form onSubmit={handleSubmit} ref={ref} className="max-w-sm mx-auto ">
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
              Email
            </label>
            <input
              type="email"
              name="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="correo@correo.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-white dark:text-white"

            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="*********"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-white dark:text-white">
              AvatarUrl
            </label>
            <input
              type="url"
              name="avatarURL"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="http://my-avatar.com"
              
            />
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label className="ms-2 text-sm font-medium text-white dark:text-white">
              Estoy de acuerdo con el{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Registrarse
          </button>
        </form>
        <div className="mt-4 text-white dark:text-white">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/users/login"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
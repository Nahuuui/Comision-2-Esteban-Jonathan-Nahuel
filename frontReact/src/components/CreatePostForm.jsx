import { useContext, useRef } from "react"; // useRef para q despues de apretar en el boton register, se resete los campos
import { useNavigate } from "react-router-dom"; // useNavigate para redericcionar hacia otra pagina a la fuerza
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";

const CreatePostForm = () => {
  const ref = useRef(null); // creo el ref para dentro guardar en useRef(null) para luego aplicarle el metodo rest y se borre los datos puestos en el form
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target); // con esto obtenemos todo la informacion del backend

    // accedo a cada informacion de mi backend
    const title = formData.get("title");
    const description = formData.get("description");
    const imageURL = formData.get("imageURL");

    // guardo toda la informacion en un objeto (mas organizado)
    const post = {
      title,
      description,
      imageURL,
    };

    const req = await fetch(`${API_URL}/posts/createPost`, {
      // acuerdese q el fetch es para traer informacion desde una url
      method: "POST", // queremos hacer un post
      body: JSON.stringify(post), // al body le enviamos el objeto user q habiamos sacado del formulario pero en formato json, ya q en el body del postman recibe en formato json
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    });

    // como en mi ctrlRegisterUser maneja un 201 en caso de crear una cuenta correctamente
    if (req.status != 201) return console.error("Error al registrar usuario"); // manejo de error

    // para verificar si funciono correctamente
    const res = await req.json(); // guardamos la peticion de informacion (user, password, etc)  q hicimos en formato json dentro de la var res
    console.log(res);

    navigate("/posts");
    ref.current.reset(); // esto nos sirve para resetear el formulario una vez haya hecho click en registrarse

  };

  const handleCancel = () => {
    // Vuelve a la página anterior
    navigate(-1);
  };
  
  return (
    <div className="flex items-center justify-center h-screen text-white">
      <div className="text-center">
        <h1 className="text-3xl font-semibold dark:text-white mb-4">
          Creando tu Post...
        </h1>
        <form onSubmit={handleSubmit} ref={ref} className="max-w-sm mx-auto">
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-white dark:text-white">
              Titulo
            </label>
            <input
              type="text"
              name="title"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="titulo"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-white dark:text-white">
              descripcion
            </label>
            <input
              type="text"
              name="description"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="descripcion..."
              required
            />
          </div>
          <div className="mb-5">
            <label
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              imageURL
            </label>
            <input
              type="url"
              name="imageURL"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="http://imagen.com"
              required
            />
          </div>

          <div className="flex justify-between items-center mt-8">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Crear Post
            </button>
            <button
              onClick={handleCancel}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Cancelar
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
export default CreatePostForm
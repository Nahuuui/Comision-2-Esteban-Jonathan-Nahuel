import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../utils/consts";

const EditPostForm = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { auth } = useContext(AuthContext);


  const [postData, setPostData] = useState({ title: "", description: "", imageURL: "" });



  useEffect(() => {
    fetch(`${API_URL}/posts/${params.postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPostData(data);

        // comprobamos q traemos bien la informacion
        console.log({ titulo: data.title });
        console.log({ descripcion: data.description });
        console.log({ imageUrl: data.imageURL });
      })
      .catch((error) => {
        console.error("Error al obtener el post:", error);
      });
  }, [params.postId]);


  // Luego, cuando estés listo para editar el post, realiza la solicitud PUT con los datos actualizados
  const handleEditPost = () => {
    fetch(`${API_URL}/posts/${params.postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(postData), // Enviar los datos actualizados en el cuerpo de la solicitud
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Post editado con éxito:", data);
        navigate('/posts')
      })
      .catch((error) => {
        console.error("Error al editar el post:", error);
      });
  };


  return (
    <div className="max-w-md mx-auto p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-4">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Editando post Post..</h2>
      {/* Títulos y campos de formulario */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-600 dark:text-gray-300 text-white">
          Título
        </label>
        <input
          id="title"
          type="text"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-600 dark:text-gray-300 text-white">
          Descripción
        </label>
        <input
          id="description"
          type="text"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
          value={postData.description}
          onChange={(e) => setPostData({ ...postData, description: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="imageURL" className="block text-sm font-medium text-gray-600 dark:text-gray-300 text-white">
          URL de la Imagen
        </label>
        <input
          id="imageURL"
          type="url"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
          value={postData.imageURL}
          onChange={(e) => setPostData({ ...postData, imageURL: e.target.value })}
        />
      </div>

      {/* Botón de guardar cambios */}
      <div className="flex justify-between">
        <button
          onClick={handleEditPost}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
        >
          Guardar cambios
        </button>
        <Link
          to={'/posts'}
          className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring focus:border-gray-300"
        >
          Cancelar
        </Link>
      </div>
    </div>
  );
};
export default EditPostForm;

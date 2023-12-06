import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../utils/consts";
import { useNavigate } from 'react-router-dom';


const CardComment = ({ postId, onCommentSubmit }) => {
  const { auth } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchComments();
  }, [auth]); 

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_URL}/comments/${postId}`, {
        headers: {  
          Authorization: `Bearer ${auth.token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (auth && postId && comment) {
      try {
        const response = await fetch(`${API_URL}/comments/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ description: comment }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        console.log("Comentario enviado exitosamente:", data);

        // Actualiza el estado local con el nuevo comentario
        setComments([...comments, data]);

        window.location.reload();
        // Llama a la función de retorno de llamada del componente padre si es necesario
        if (onCommentSubmit) {
          onCommentSubmit(data); // Puedes pasar la información del comentario al componente padre si es necesario
        }

        // Limpia el campo de comentarios después de enviarlo
        setComment("");

        // recargamos
        navigate('/posts');

      } catch (error) {
        console.error("Error submitting comment:", error.message);
      }
    }
  };

  return auth ? (
    <form onSubmit={handleSubmit} className="p-3 bg-gray-50 dark:bg-gray-700">
      <div className="flex items-center">
        <button
          type="button"
          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
        ></button>
        <textarea
          id="chat"
          rows="1"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="block flex-1 mx-2 p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your message..."
        ></textarea>
        <button
          type="button"
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          onClick={handleSubmit} 
        >
          <svg
            className="w-5 h-5 rotate-90 rtl:-rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
          </svg>
        </button>
      </div>
    </form>
  ) : null
};

export default CardComment;
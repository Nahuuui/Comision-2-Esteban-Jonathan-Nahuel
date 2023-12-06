import CardPosts from "../components/CardPosts";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { API_URL } from "../utils/consts";
import { NavBar } from "../components/NavBar";


const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const { auth } = useContext(AuthContext);

  const fetchPosts = async () => {
    try {
      const url = auth ? `${API_URL}/posts` : `${API_URL}/posts`;
      const headers = auth ? { Authorization: `Bearer ${auth.token}` } : undefined;

      const response = await fetch(url, { headers });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);

    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);



  const handleCommentSubmit = (postId, comment) => {
    console.log(
      "Comment submitted for postId:",
      postId,
      "with comment:",
      comment
    );
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      console.log(
        "Deleting comment with postId:",
        postId,
        "and commentId:",
        commentId
      );

      const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Comment deleted successfully:", data);

      // Después de eliminar, actualiza los comentarios
      fetchPosts();
    } catch (error) {
      console.error("Error deleting comment:", error.message);
    }
  };

  const handleEditComment = async (postId, commentId, updatedComment) => {
    try {
      console.log("Editing comment with postId:", postId, "and commentId:", commentId);

      const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ description: updatedComment }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Comment edited successfully:", data);

      // Después de editar el comentario, se actualiza el post
      fetchPosts();
    } catch (error) {
      console.error("Error editing comment:", error.message);
      // Puedes manejar el error de manera apropiada, como mostrar un mensaje al usuario
    }
  };



  const handleDeletePost = async (postId) => {
    try {
      console.log("Delete post:", postId);


      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Post delete successfully:", data);

      // Después de eliminar un post, se actualiza los posts
      fetchPosts();
    } catch (error) {
      console.error("Error delete post:", error.message);
      // Puedes manejar el error de manera apropiada, como mostrar un mensaje al usuario
    }

  };


  return (
    <>
      <NavBar />
      <h1 className="text-center text-white mb-4 ">Aclaracion: Si quiere ver la imagen completa del post, haga click sobre la misma</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post._id} className="lg:col-span-1">
            <CardPosts
              key={post._id}
              title={post.title}
              description={post.description}

              authorId={post.author?._id}
              authorUsername={post.author?.username}


              comments={post.comments}
              imageURL={post.imageURL}
              postId={post._id}
              handleCommentSubmit={handleCommentSubmit}
              handleDeleteComment={handleDeleteComment} // Pasa la función de eliminación como prop
              handleEditComment={handleEditComment}  // Pasa la función de edición como prop
              handleDeletePost={handleDeletePost} // Pasa la función de eliminación de post como prop


            />
          </div>
        ))}
      </div>
    </>
  );
};
export default PostListPage;
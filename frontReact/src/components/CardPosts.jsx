import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import CardComment from "./CardComment";
import { AuthContext } from "../providers/AuthProvider";

const CardPosts = ({
  title,
  description,
  authorId,
  authorUsername,
  comments,
  imageURL,
  postId,
  handleCommentSubmit,
  handleDeleteComment,
  handleEditComment,
  handleDeletePost,
}) => {
  const { auth } = useContext(AuthContext);
  const [editedComments, setEditedComments] = useState({});

  const handleStartEditComment = (commentId, currentComment) => {
    setEditedComments({
      ...editedComments,
      [commentId]: { content: currentComment },
    });
  };

  const handleCancelEditComment = (commentId) => {
    const { [commentId]: deletedComment, ...rest } = editedComments;
    setEditedComments(rest);
  };

  const handleSaveEditedComment = (commentId) => {
    const editedComment = editedComments[commentId];

    if (editedComment && editedComment.content) {
      handleEditComment(postId, commentId, editedComment.content);
      handleCancelEditComment(commentId);
    }
  };

  const handleEditInputChange = (commentId, value) => {
    setEditedComments({
      ...editedComments,
      [commentId]: { content: value },
    });
  };

  const isCommentOwner = (comment) => {
    return auth && comment.author && comment.author._id === auth.user._id;
  };

  return (
    <div className="max-w-md mx-auto mb-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={imageURL}>
        <img
          className="w-full h-48 object-cover rounded-t-lg"
          src={imageURL}
          alt="PostImage"
        />
      </Link>
      <div className="p-5">
        <Link to="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </Link>
        <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <div className="mb-2 sm:mb-0">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Author Post: {authorUsername}
          </p>
        </div>

        {comments.map((comment) => (
          <div key={comment._id} className="mb-2 mt-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Comment Author: {comment.author ? comment.author.username : ""}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Comment: {comment.description}
            </p>

            {auth && (
              <div className="flex justify-between mt-5">
                {editedComments[comment._id] ? (
                  <>
                    <input
                      type="text"
                      value={editedComments[comment._id].content}
                      onChange={(e) =>
                        handleEditInputChange(comment._id, e.target.value)
                      }
                      className="p-2 border border-gray-300 rounded text-black"
                    />
                    <button
                      type="button"
                      onClick={() => handleSaveEditedComment(comment._id)}
                      className="bg-green-500 text-white p-2 rounded hover:bg-green-700"
                    >
                      Guardar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCancelEditComment(comment._id)}
                      className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    {isCommentOwner(comment) && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteComment(postId, comment._id)
                          }
                          className="delete-comment-button bg-red-500 text-white p-2 rounded hover:bg-red-700 focus:bg-red-700"
                        >
                          Eliminar Comentario
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleStartEditComment(
                              comment._id,
                              comment.description
                            )
                          }
                          className="edit-comment-button bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                        >
                          Editar Comentario
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        ))}

        {auth && auth.user && authorId === auth.user._id && (
          <div className="flex justify-between mt-5">
            <Link to={`/posts/${postId}`}>
              <button className="edit-post-button bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300">
                Editar Post
              </button>
            </Link>
            <button
              type="button"
              onClick={() => handleDeletePost(postId)}
              className="delete-post-button bg-red-500 text-white p-2 rounded hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300"
            >
              Eliminar Post
            </button>
          </div>
        )}
      </div>
      <CardComment postId={postId} onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default CardPosts;

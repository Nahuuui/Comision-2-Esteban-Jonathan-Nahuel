import {CommentModel} from "../models/comentario-model.js"
import {PostModel} from "../models/post-model.js"

// Controlador para la creación de comentarios
const createCommentController = async (req, res) => {
    try {
      const { description } = req.body;
      const author = req.user; // Obtener el usuario autenticado desde el middleware de autenticación
      const postId = req.params.postId;
  
      // Buscar la publicación en la que se quiere comentar
      const post = await PostModel.findById(postId);
  
      // Verificar que la publicación exista
      if (!post) {
        return res.status(404).json({ error: 'Publicación no encontrada.' });
      }
  
      // Crear un nuevo comentario utilizando el modelo
      const newComment = new CommentModel({
        description,
        author,
      });
  
      // Guardar el nuevo comentario en la base de datos
      await newComment.save();
  
      // Agregar el _id del comentario al array de comentarios de la publicación
      post.comments.push(newComment._id);
      // Guardar los cambios en la publicación
      await post.save();
  
      res.status(201).json({ message: 'Comentario creado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear el comentario.' });
    }
  };
  
  // Controlador para la eliminación de comentarios
  const deleteCommentController = async (req, res) => {
    try {
      const commentId = req.params.commentId;
  
      // Buscar y eliminar el comentario por su _id
      const comment = await CommentModel.findOneAndDelete({ _id: commentId });
  
      if (!comment) {
        return res.status(404).json({ error: 'Comentario no encontrado.' });
      }
  
      // Verificar que el usuario que solicita la eliminación sea el autor del comentario
      if (comment.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'No tienes permisos para eliminar este comentario.' });
      }
  
      res.status(200).json({ message: 'Comentario eliminado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar el comentario.' });
    }
  };
  
  // Controlador para la edición de comentarios
  const editCommentController = async (req, res) => {
    try {
      const commentId = req.params.commentId;
      const { description } = req.body;
  
      // Buscar y actualizar el comentario por su _id
      const comment = await CommentModel.findById(commentId);
  
      // Verificar que el comentario exista
      if (!comment) {
        return res.status(404).json({ error: 'Comentario no encontrado.' });
      }
  
      // Verificar que el usuario que intenta editar el comentario sea el propietario
      if (comment.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'No tienes permisos para editar este comentario.' });
      }
  
      // Actualizar la descripción del comentario
      comment.description = description;
  
      // Guardar los cambios en el comentario
      await comment.save();
  
      res.status(200).json({ message: 'Comentario editado exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al editar el comentario.' });
    }
  };
  
  export {
    createCommentController,
    deleteCommentController,
    editCommentController,
  };
import {PostModel} from "../models/post-model.js"

// Controlador para obtener todas las publicaciones
const getPostsController = async (req, res) => {
    try {
      // Obtener todas las publicaciones de la base de datos, incluyendo información del autor y comentarios
      const posts = await PostModel.find().populate('author', 'username avatarURL').populate({
        path: 'comments',
        populate: { path: 'author', select: 'username avatarURL' },
      });
  
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener las publicaciones.' });
    }
  };
  
  // Controlador para la creación de publicaciones
  const createPostController = async (req, res) => {
    try {
      const { title, description, imageURL } = req.body;
      const author = req.user; // Obtener el usuario autenticado desde el middleware de autenticación
  
      // Crear una nueva publicación utilizando el modelo
      const newPost = new PostModel({
        title,
        description,
        author,
        imageURL,
        createdAt: new Date(),
      });
  
      // Guardar la nueva publicación en la base de datos
      await newPost.save();
      res.status(201).json({ message: 'Publicación creada exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear la publicación.' });
    }
  };
  
  // Controlador para la eliminación de publicaciones
  const deletePostController = async (req, res) => {
    try {
      const postId = req.params.postId;
      // Buscar la publicación por ID en la base de datos
      const post = await PostModel.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Publicación no encontrada.' });
      }
  
      // Verificar que el usuario que solicita la eliminación sea el autor de la publicación
      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'No tienes permisos para eliminar esta publicación.' });
      }
  
      // Eliminar la publicación de la base de datos
      await PostModel.deleteOne({ _id: postId });
      res.status(200).json({ message: 'Publicación eliminada exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la publicación.' });
    }
  };
  
  // Controlador para la edición de publicaciones
  const editPostController = async (req, res) => {
    try {
      const postId = req.params.postId;
      const { title, description, imageURL } = req.body;
  
      // Buscar la publicación por ID en la base de datos
      const post = await PostModel.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: 'Publicación no encontrada.' });
      }
  
      // Verificar que el usuario que solicita la edición sea el autor de la publicación
      if (post.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'No tienes permisos para editar esta publicación.' });
      }
  
      // Actualizar la información de la publicación
      post.title = title;
      post.description = description;
      post.imageURL = imageURL;
  
      // Guardar los cambios en la base de datos
      await post.save();
      res.status(200).json({ message: 'Publicación editada exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al editar la publicación.' });
    }
  };
  
  export {
    getPostsController,
    createPostController,
    deletePostController,
    editPostController,
  };
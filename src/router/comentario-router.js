import { Router } from "express";
import {createCommentController, deleteCommentController, editCommentController, getCommentsForPosts } from "../controller/comentario-controller.js";

const comentariorouter= Router();


comentariorouter.post("/:postId", createCommentController  ); 
comentariorouter.put("/:commentId", editCommentController );
comentariorouter.delete("/:commentId",  deleteCommentController); 
comentariorouter.get("/:postId", getCommentsForPosts  );
export { comentariorouter };
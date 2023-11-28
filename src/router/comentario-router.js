import { Router } from "express";
import {createCommentController, deleteCommentController, editCommentController } from "../controller/comentario-controller.js";

const comentariorouter= Router();


comentariorouter.post("/:postId", createCommentController  ); 
comentariorouter.put("/:commentId", editCommentController );
comentariorouter.delete("/:commentId",  deleteCommentController); 

export { commentRouter };
import { Router } from "express";
import {createPostController, editPostController, deletePostController, getPostsController, getPostByIdController } from "../controller/post-controller.js";
import { autotenMiddleware } from "../middleware/autoten-middleware.js";

const postrouter = Router();



postrouter.get("/", getPostsController); 
postrouter.get("/:postId", getPostByIdController);

postrouter.use(autotenMiddleware)

postrouter.post("/createPost", createPostController );
postrouter.put("/:postId", editPostController ); 
postrouter.delete("/:postId", deletePostController );

export { postrouter};
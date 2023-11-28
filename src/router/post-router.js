import { Router } from "express";
import {createPostController, editPostController, deletePostController, getPostsController } from "../controller/post-controller.js";

const postrouter = Router();

postrouter.get("/", getPostsController); 
postrouter.post("/createPost", createPostController );
postrouter.put("/:postId", editPostController ); 
postrouter.delete("/:postId", deletePostController );

export { postrouter};
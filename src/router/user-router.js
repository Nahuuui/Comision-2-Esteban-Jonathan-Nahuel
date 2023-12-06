import { Router } from "express";
import {loginUserController, registerUserController } from "../controller/user-controller.js";

const userouter = Router()

userouter.post("/register", registerUserController ); 
userouter.post("/login", loginUserController );  

export { userouter};
import { Router } from "express";
import {loginUserController, logoutUserController, registerUserController } from "../controller/user-controller";

const userouter = Router()

userouter.post("/register", registerUserController ); 
userouter.post("/login", loginUserController ); 
userouter.post("/logout", logoutUserController); 

export { userouter};
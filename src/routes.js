import { Router } from "express";
import { getUsers, createUser, deleteUser, loginUser } from "./controllers/UserController.js";

const routes = Router();

routes.get("/users", getUsers);
routes.post("/users", createUser);
routes.get("/users/login", loginUser);
routes.post("/users/delete/:id", deleteUser);

export default routes
import express from "express";
import controller from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const userRoutes = express.Router();

userRoutes.post("/register", controller.registerUser);
userRoutes.post("/login", controller.authentication);

userRoutes.get("/", auth, controller.listUsers);
userRoutes.put("/:id", auth, controller.updateUser);
userRoutes.delete("/:id", auth, controller.deleteUser);

export default userRoutes;

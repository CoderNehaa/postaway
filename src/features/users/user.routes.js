import express from "express";
import UserController from "./user.controller.js";
import valMiddleware from "../../middlewares/validation.middleware.js";
import jwtAuth from "../../middlewares/jwtAuth.middleware.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.get('/', jwtAuth, userController.getUsers);
userRouter.post('/signup', valMiddleware, userController.handleRegistration);
userRouter.post('/signin', userController.handleLogin);

export default userRouter;
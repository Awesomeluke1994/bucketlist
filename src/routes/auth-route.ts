import {Router} from "express";
import  * as authController from "../controllers/auth-controller";
const authRouter = Router();

authRouter.post('/registerUser', authController.registerUser)
authRouter.post('/login', authController.login)

export default authRouter

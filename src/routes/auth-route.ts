const express = require('express');
const authRouter = express.Router();
import {AuthController} from "../controllers/auth-controller";

const authController = new AuthController();
authRouter.post('/registerUser', authController.registerUser)
authRouter.post('/login', authController.login)

export {
    authRouter
}

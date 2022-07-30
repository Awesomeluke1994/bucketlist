const express = require('express');
const authRouter = express.Router();
import  * as authController from "../controllers/auth-controller";

authRouter.post('/registerUser', authController.registerUser)
authRouter.post('/login', authController.login)

export {
    authRouter
}

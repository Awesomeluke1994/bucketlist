import {verifyToken} from "../middleware/auth-middleware";

const express = require('express');
const userRouter = express.Router();
//const userController = require('../controllers/user-controller');
import {getAll} from "../controllers/user-controller";

userRouter.get('/getAllUsers', verifyToken, getAll)

export {
    userRouter
}

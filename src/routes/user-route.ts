import {verifyToken} from "../middleware/auth-middleware";

const express = require('express');
const userRouter = express.Router();
import {getAll} from "../controllers/user-controller";

userRouter.get('/getAllUsers', verifyToken, getAll)

export {
    userRouter
}

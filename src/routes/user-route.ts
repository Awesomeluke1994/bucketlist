import {verifyToken} from "../middleware/auth-middleware";
import express from "express"
const userRouter = express.Router();

import {getAll} from "../controllers/user-controller";

userRouter.get('/getAllUsers', verifyToken, getAll)

export {
    userRouter
}

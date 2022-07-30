import {verifyToken} from "../middleware/auth-middleware";
import express from "express"
import {getAll} from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get('/getAllUsers', verifyToken, getAll)

export default userRouter

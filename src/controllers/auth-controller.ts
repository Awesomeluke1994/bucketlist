import {CreateUserRequest, LoginRequest, TypedRequestBody} from "../global";
import {Response} from "express";
import * as authService from "../services/auth-service";

export class AuthController {

    registerUser = async (req: TypedRequestBody<CreateUserRequest>, res: Response) => {
        const request = req.body

        await authService.registerUser(request);

        res.send("success");
    };

    login = async(req: TypedRequestBody<LoginRequest>, res: Response) => {
        const isASuccessfulLogin = await authService.login(req.body);

        if(isASuccessfulLogin) {
            res.status(200).send(isASuccessfulLogin)
            return;
        }

        res.status(401).send("Unable to log user in")
    }
}

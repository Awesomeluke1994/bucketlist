import {CreateUserRequest, LoginRequest, TypedRequestBody} from "../global";
import {Response} from "express";
import * as authService from "../services/auth-service";
import * as validator from "email-validator"


const registerUser = async (req: TypedRequestBody<CreateUserRequest>, res: Response) => {
    const request = req.body

    if (!request.email || !request.password || !request.firstName || !request.lastName) {
        return res.status(422).send("Request body is invalid")
    }

    if (!validator.validate(req.body.email)) {
        return res.status(422).send("Not a valid email")
    }

    if (await authService.userExistsByEmail(req.body.email)) {
        return res.status(500).send("Unable to register user")
    }

    try {
        await authService.registerUser(request);
    } catch (e) {
        return res.status(500).send("Unable to register user")
    }

    res.send("User registration successful");
};

const login = async (req: TypedRequestBody<LoginRequest>, res: Response) => {
    const isASuccessfulLogin = await authService.login(req.body);

    if (isASuccessfulLogin) {
        res.status(200).send(isASuccessfulLogin)
        return;
    }

    res.status(401).send("Unable to log user in")
}

export {
    login,
    registerUser
}

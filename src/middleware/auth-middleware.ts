import jwt from 'jsonwebtoken'
import {NextFunction, Response} from "express";
import {TokenDetails, TypedRequestBody} from "../types/global";

const ENV_CONFIG = process.env;

const verifyToken = (req: TypedRequestBody<unknown>, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    let token;

    if (!authHeader) {
        return res.status(403).send("Unauthorised");
    }

    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7, authHeader.length);
    } else {
        return unauthorised(res)
    }

    try {
        const decoded = jwt.verify(token, ENV_CONFIG.TOKEN_KEY as string) as TokenDetails
        if(!decoded) {
            return unauthorised(res);
        }
        req.tokenDetails = {email: decoded.email, userId: decoded.userId};
    } catch (e) {
        return unauthorised(res)
    }
    return next();
}

const unauthorised = (res: Response) => {
    res.status(401).send("Unauthorised")
}

export {
    verifyToken
}

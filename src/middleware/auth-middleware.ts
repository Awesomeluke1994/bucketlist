const jwt = require("jsonwebtoken")
import {NextFunction, Request, Response} from "express";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
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
        const decoded = jwt.decode(token, process.env.TOKEN_KEY)
        req.params['userDetails'] = decoded.payload;
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

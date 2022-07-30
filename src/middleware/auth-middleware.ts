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
        res.status(403).send("Unauthorised");
    }

    try {
        jwt.decode(token, process.env.TOKEN_KEY)
    } catch (e) {
        res.status(401).send("Unauthorised")
    }
    return next();
}

export {
    verifyToken
}

import {Request} from "express";

interface TypedRequestBody<T> extends Request {
    body: T,
    tokenDetails?: TokenDetails
}

interface CreateUserRequest {
    email: string;
    firstName: string;
    password: string;
    lastName: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface TokenDetails {
    email: string;
    userId: number;
}

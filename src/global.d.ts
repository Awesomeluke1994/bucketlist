import {Request} from "express";

interface TypedRequestBody<T> extends Request {
    body: T
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

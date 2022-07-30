import {Request} from "express";

export interface TypedRequestBody<T> extends Request {
    body: T,
    tokenDetails?: TokenDetails
}

export interface CreateUserRequest {
    email: string;
    firstName: string;
    password: string;
    lastName: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface TokenDetails {
    email: string;
    userId: number;
}

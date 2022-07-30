import {CreateUserRequest, LoginRequest, TokenDetails} from "../global";
import {PrismaClient, User} from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const saltRounds = 10;
const config = process.env;

const registerUser = async (createUserRequest: CreateUserRequest): Promise<void> => {
    const hashedPassword = await bcrypt.hash(createUserRequest.password, saltRounds);

    await prisma.user.create({
        data: {
            firstName: createUserRequest.firstName,
            email: createUserRequest.email,
            password: hashedPassword,
            lastName: createUserRequest.lastName
        }
    })
}

const userExistsByEmail = async (email: string): Promise<boolean> => {
    return !!await prisma.user.findUnique({
        where: {
            email: email
        }
    })
}

const createToken = (user: User) => {
    const tokenDetails: TokenDetails = {userId: user.id, email: user.email};

    return jwt.sign(tokenDetails, config.TOKEN_KEY as string, {
        expiresIn: "3h"
    });
}

const login = async (loginRequest: LoginRequest) => {
    const user = await prisma.user.findUnique({
        where: {
            email: loginRequest.email
        }
    })

    if (!user) {
        return;
    }

    const userPasswordHash = user.password as string;
    let validate: boolean;

    try {
        validate = await bcrypt.compare(loginRequest.password, userPasswordHash);
    } catch (e) {
        throw "Unable to login"
    }

    const token = createToken(user);

    if (validate) {
        return {
            token: token
        };
    }
}

export {
    login,
    registerUser,
    userExistsByEmail
}

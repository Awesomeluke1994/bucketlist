import {CreateUserRequest, LoginRequest, TokenDetails} from "../global";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const registerUser = async (createUserRequest: CreateUserRequest): Promise<void> => {
    const hashedPassword = await bcrypt.hash(createUserRequest.password, saltRounds);

    await prisma.user.create({
        data: {
            firstName: createUserRequest.firstName,
            email: createUserRequest.email,
            password: hashedPassword
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

const login = async (loginRequest: LoginRequest) => {
    const user = await prisma.user.findUnique({
        where: {
            email: loginRequest.email
        }
    })

    if (!user) {
        return;
    }

    const validate = await bcrypt.compare(loginRequest.password, user.password)

    const tokenDetails: TokenDetails = {userId: user.id, email: user.email};

    const token = await jwt.sign(tokenDetails, process.env.TOKEN_KEY, {
        expiresIn: "3h"
    })

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

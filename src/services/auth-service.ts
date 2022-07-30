import {CreateUserRequest, LoginRequest} from "../global";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

export class AuthService {
    registerUser = async (createUserRequest: CreateUserRequest) => {
        const hashedPassword = await bcrypt.hash(createUserRequest.password, saltRounds);
        await prisma.user.create({
            data: {
                firstName: createUserRequest.firstName,
                email: createUserRequest.email,
                password: hashedPassword
            }
        })
    }

    login = async (loginRequest: LoginRequest) => {
        const user = await prisma.user.findUnique({
            where: {
                email: loginRequest.email
            }
        })

        if(!user) {
            return;
        }

        const validate = await bcrypt.compare(loginRequest.password, user.password)

        const token = await jwt.sign({
            userId: user.id,
            email: user.email
        }, process.env.TOKEN_KEY, {
            expiresIn: "3h"
        })

        if(validate) {
            return {
                token: token
            };
        }

    }
}

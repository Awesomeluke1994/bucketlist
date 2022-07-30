import {PrismaClient} from "@prisma/client";
import {Response} from "express";
import {GetAllUsersResponse, TypedRequestBody} from "../types/global";

const prisma = new PrismaClient()

const getAll = async (_req: TypedRequestBody<void>, res: Response) => {
    const allUsers = await prisma.user.findMany();
    const userDetails: GetAllUsersResponse = {
        users: allUsers.map((user) => ({
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName
        }))
    }
    res.json(userDetails)
};

export {
    getAll,
}

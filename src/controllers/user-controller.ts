import {PrismaClient} from "@prisma/client";
import {Response} from "express";
import {TypedRequestBody} from "../global";

const prisma = new PrismaClient()

const getAll = async (req: TypedRequestBody<void>, res: Response) => {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers)
};

export {
    getAll,
}

import {PrismaClient} from "@prisma/client";
import {Response, Request} from "express";

const prisma = new PrismaClient()

const getAll = async (req: Request, res: Response) => {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers)
};

export {
    getAll,
}

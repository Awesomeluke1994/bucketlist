import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

const getAll = async (req: any, res: any) => {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers)
};

export {
    getAll,
}

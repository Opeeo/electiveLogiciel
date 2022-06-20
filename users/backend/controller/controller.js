const asyncHandler = require ("express-async-handler");
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//@desc Get users
//@route GET /api/user/
//@access Private
const getUsers = asyncHandler(async (req, res, next) => {
    const createUser = await prisma.user.findMany();

    res.status(200).json(createUser);
});
    

module.exports = {
    getUsers
}
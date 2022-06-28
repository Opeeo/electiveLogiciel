const asyncHandler = require ("express-async-handler");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

//@desc Create a role
//@route POST /api/profile/role/
//@access Private
const createARole = asyncHandler(async (req, res, next) => {
    if(!req.body.name){
        res.status(400);
        throw new Error('Missing information');
    }

    const role = await prisma.role.create({
        data: {
            name: req.body.name,
        },
    });

    res.status(201).json(role);
});

module.exports = {
    createARole,
}
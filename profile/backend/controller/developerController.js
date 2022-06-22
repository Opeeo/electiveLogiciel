const asyncHandler = require ("express-async-handler");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

//@desc Get developer
//@route GET /api/developer/
//@access Private
const getDeveloper = asyncHandler(async (req, res, next) => {
    const developer = await prisma.developer.findMany();

    res.status(200).json(developer);
});

//@desc Get one developer
//@route GET /api/developer/:id
//@access Private
const getADeveloper = asyncHandler(async (req, res, next) => {
    try {
        const developer = await prisma.developer.findUnique({ where: {profileId: Number(req.params.id)}})
        res.status(200).json(developer);
    } catch (error) {
        res.status(400)
        throw new Error('Invalid developer')
    }
});


//@desc Create a developer
//@route POST /api/developer/
//@access Private
const createADeveloper = asyncHandler(async (req, res, next) => {
    if(!req.body.profile_id){
        res.status(400);
        throw new Error('Missing information');
    }
    try {
        const profile = await prisma.profile.findUnique({ where: {id: Number(req.body.profile_id)} })
    } catch (error) {
        res.status(400)
        throw new Error('Invalid profile')
    }
    const developer = await prisma.developer.create({
        data: {
            profileId: Number(req.body.profile_id),
        },
    });

    res.status(201).json(developer);
});

//@desc update a developer
//@route PUT /api/developer/:id
//@access Private
const updateADeveloper = asyncHandler(async (req, res, next) => {
    try {
        const developer = await prisma.developer.findUnique({ where: {profileId: Number(req.params.id)}});
    } catch (error) {
        res.status(400)
        throw new Error('Invalid developer')
    }

    const updatedDeveloper = await prisma.developer.update({
        where: {
            profileId:  Number(req.params.id),
        },
        data: req.body});

    res.status(200).json(updatedDeveloper);
});

//@desc delete a developer
//@route DELETE /api/developer/:id
//@access Private
const deleteADeveloper = asyncHandler(async (req, res, next) => {
    try {
        const developer = await prisma.developer.findUnique({ where: {profileId: Number(req.params.id)}});
    } catch (error) {
        res.status(400)
        throw new Error('Invalid developer')
    }

    const deletedDeveloper = await prisma.developer.delete({where: {profileId: Number(req.params.id)}});

    res.status(200).json(deletedDeveloper);
}); 

module.exports = {
    getDeveloper,
    getADeveloper,
    createADeveloper,
    updateADeveloper,
    deleteADeveloper,
}
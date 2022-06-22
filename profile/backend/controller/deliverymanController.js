const asyncHandler = require ("express-async-handler");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

//@desc Get deliveryman
//@route GET /api/deliveryman/
//@access Private
const getDeliveryman = asyncHandler(async (req, res, next) => {
    const deliveryman = await prisma.deliveryman.findMany();

    res.status(200).json(deliveryman);
});

//@desc Get one deliveryman
//@route GET /api/deliveryman/:id
//@access Private
const getADeliveryman = asyncHandler(async (req, res, next) => {
    try {
        const deliveryman = await prisma.deliveryman.findUnique({ where: {profileId: Number(req.params.id)}})
    } catch (error) {
        res.status(400)
        throw new Error('Invalid profile')
    }

    res.status(200).json(deliveryman);
});


//@desc Create a deliveryman
//@route POST /api/deliveryman/
//@access Private
const createADeliveryman = asyncHandler(async (req, res, next) => {
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
    const deliveryman = await prisma.deliveryman.create({
        data: {
            profileId: Number(req.body.profile_id),
            vehicule_type: req.body.vehicule_type,
        },
    });

    res.status(201).json(deliveryman);
});

//@desc update a deliveryman
//@route PUT /api/deliveryman/:id
//@access Private
const updateADeliveryman = asyncHandler(async (req, res, next) => {
    try {
        const deliveryman = await prisma.deliveryman.findUnique({ where: {profileId: Number(req.params.id)}});
    } catch (error) {
        res.status(400)
        throw new Error('Invalid deliveryman')
    }

    const updatedDeliveryman = await prisma.deliveryman.update({
        where: {
            profileId:  Number(req.params.id),
        },
        data: req.body});

    res.status(200).json(updatedDeliveryman);
});

//@desc delete a deliveryman
//@route DELETE /api/deliveryman/:id
//@access Private
const deleteADeliveryman = asyncHandler(async (req, res, next) => {
    try {
        const deliveryman = await prisma.deliveryman.findUnique({ where: {profileId: Number(req.params.id)}});
    } catch (error) {
        res.status(400)
        throw new Error('Invalid deliveryman')
    }

    const deletedDeliveryman = await prisma.deliveryman.delete({where: {profileId: Number(req.params.id)}});

    res.status(200).json(deletedProfile);
}); 

module.exports = {
    getDeliveryman,
    getADeliveryman,
    createADeliveryman,
    updateADeliveryman,
    deleteADeliveryman,
}
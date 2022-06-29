const asyncHandler = require ("express-async-handler");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

//@desc Get restaurant owner
//@route GET /api/profile/restaurantowner/
//@access Private
const getRestaurantOwner = asyncHandler(async (req, res, next) => {
    const restaurantowner = await prisma.restaurantowner.findMany();

    res.status(200).json(restaurantowner);
});

//@desc Get one restaurant owner
//@route GET /api/profile/restaurantowner/:id
//@access Private
const getARestaurantOwner = asyncHandler(async (req, res, next) => {

    const restaurantowner = await prisma.restaurantowner.findUnique({ where: {profile_id: Number(req.params.id)}})

    if(!restaurantowner){
        res.status(400)
        throw new Error('Invalid restaurator')
    }
    res.status(200).json(restaurator);

});


//@desc Create a restaurator
//@route POST /api/profile/restaurator/
//@access Private
const createARestaurator = asyncHandler(async (req, res, next) => {
    if(!req.body.profile_id){
        res.status(400);
        throw new Error('Missing information');
    }
    
    if(!await prisma.profile.findUnique({ where: {id: Number(req.body.profile_id)} })){
        res.status(400)
        throw new Error('Invalid profile')
    }

    const restaurator = await prisma.restaurator.create({
        data: {
            profileId: Number(req.body.profile_id),
        },
    });

    res.status(201).json(restaurator);
});

//@desc update a restaurator
//@route PUT /api/profile/restaurator/:id
//@access Private
const updateARestaurator = asyncHandler(async (req, res, next) => {

    if(!await prisma.restaurator.findUnique({ where: {profileId: Number(req.params.id)}})){
        res.status(400);
        throw new Error('Restaurator not found');
    }

    const updatedRestaurator = await prisma.restaurator.update({
        where: {
            profileId:  Number(req.params.id),
        },
        data: req.body});

    res.status(200).json(updatedRestaurator);
});

//@desc delete a restaurator
//@route DELETE /api/profile/restaurator/:id
//@access Private
const deleteARestaurator = asyncHandler(async (req, res, next) => {
    if(!await prisma.restaurator.findUnique({ where: {profileId: Number(req.params.id)}})){
        res.status(400);
        throw new Error('Restaurator not found');
    }

    const deletedRestaurator = await prisma.restaurator.delete({where: {profileId: Number(req.params.id)}});

    res.status(200).json(deletedRestaurator);
}); 

module.exports = {
    getRestaurator,
    getARestaurator,
    createARestaurator,
    updateARestaurator,
    deleteARestaurator,
}
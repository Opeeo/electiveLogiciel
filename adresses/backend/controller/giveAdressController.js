const asyncHandler = require ("express-async-handler");
const { PrismaClient } = require('@prisma/client');
const { now } = require("mongoose");

const prisma = new PrismaClient();

//@desc Get adresses by profile
//@route GET /api/adress/profile/:id_profile
//@access Private
const getAdressesByProfile = asyncHandler(async (req, res, next) => {
    const adresses = await prisma.adressesOfProfile.findMany({ where: {profileId: Number(req.params.id)} });

    res.status(200).json(adresses);
});

//@desc Create a connetion beetween an adress and a profile
//@route POST /api/adress/profile
//@access Private
const giveAnAdress = asyncHandler(async (req, res, next) => {
    if(!req.body.profileId || !req.body.adressId){
        res.status(400);
        throw new Error('Missing information');
    }

    const adress = await prisma.adress.findUnique({ where: {id: Number(req.body.adressId)} });

    if(!adress){
        res.status(404);
        throw new Error('Adress not found');
    }

    const profile = await prisma.profile.findUnique({ where: {id: Number(req.body.profileId)} });


    if(!profile){
        res.status(404);
        throw new Error('Profile not found');
    }

    const connectionCreated = await prisma.adressesOfProfile.create({
        data: {
            profileId: Number(req.body.profileId),
            adressId: Number(req.body.adressId),
            assignedAt: now()
        },
    });

    res.status(201).json(connectionCreated);
});

//@desc Delete a connection beetween an adress and a profile
//@route DELETE /api/adress/profile/
//@access Private
const removeAnAdress = asyncHandler(async (req, res, next) => {
    if(!req.body.profileId || !req.body.adressId){
        res.status(400);
        throw new Error('Missing information');
    }

    const adress = await prisma.adress.findUnique({ where: {id: Number(req.body.adressId)} });

    if(!adress){
        res.status(404);
        throw new Error('Adress not found');
    }

    const profile = await prisma.profile.findUnique({ where: {id: Number(req.body.profileId)} });


    if(!profile){
        res.status(404);
        throw new Error('Profile not found');
    }

    const deletedConnection = await prisma.profile.update({
        where: {
            id: Number(req.body.profileId),
        },
        data: {
            adressesOfProfile: {
                deleteMany: [{ adressId: Number(req.body.adressId) }],
            },
        },
    })

    res.status(200).json(deletedConnection);
});

module.exports = {
    getAdressesByProfile,
    getProfilesByAdress,
    giveAnAdress,
    removeAnAdress
}
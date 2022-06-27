const asyncHandler = require ("express-async-handler");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//@desc Get sponsor of a profile
//@route GET /api/profile/sponsorship/sponsor/:id
//@access Private
const getASponsorOfAProfile = asyncHandler(async (req, res, next) => {
    const consumer = await prisma.sponsorship.findUnique({ where: {sponsoredId: Number(req.params.id)}});

    res.status(200).json(consumer);
});

//@desc Get sponsored profile by a profile
//@route GET /api/profile/sponsorship/sponsored/:id
//@access Private
const getSponsoredProfile = asyncHandler(async (req, res, next) => {
    const consumer = await prisma.sponsorship.findMany({ where: {sponsorId: Number(req.params.id)}});

    res.status(200).json(consumer);
});

//@desc Create a sponsorship
//@route POST /api/profile/sponsorship/
//@access Private
const createASponsorship = asyncHandler(async (req, res, next) => {
    if(!req.body.sponsorId || !req.body.sponsoredId){
        res.status(400);
        throw new Error('Missing information');
    }
    
    if(!await prisma.profile.findUnique({ where: {id: Number(req.body.sponsorId)} }) ||
        !await prisma.profile.findUnique({ where: {id: Number(req.body.sponsoredId)} })){
        res.status(400)
        throw new Error('Invalid profile')
    }

    const sponsorship = await prisma.sponsorship.create({ data: {
        sponsorId: Number(req.body.sponsorId),
        sponsoredId: Number(req.body.sponsoredId),
    } });

    res.status(201).json(sponsorship);

});

//@desc Delete a sponsorship
//@route DELETE /api/profile/sponsorship/
//@access Private
const removeASponsorship = asyncHandler(async (req, res, next) => {
    if(!req.body.sponsorId || !req.body.sponsoredId){
        res.status(400);
        throw new Error('Missing information');
    }

    if(!await prisma.profile.findUnique({ where: {id: Number(req.body.sponsorId)} }) ||
        !await prisma.profile.findUnique({ where: {id: Number(req.body.sponsoredId)} })){
        res.status(400)
        throw new Error('Invalid profile')
    }

    const deletedSponsorship = await prisma.sponsorship.delete({
        where: {
            sponsoredId: Number(req.body.sponsoredId),
        }
    })

    res.status(200).json(deletedSponsorship);
});

module.exports = {
    getASponsorOfAProfile,
    getSponsoredProfile,
    createASponsorship,
    removeASponsorship
}
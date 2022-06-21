const asyncHandler = require ("express-async-handler");
const { PrismaClient } = require('@prisma/client');
const { now } = require("mongoose");

const prisma = new PrismaClient()

//@desc Get profiles
//@route GET /api/profile/
//@access Private
const getProfiles = asyncHandler(async (req, res, next) => {
    const profiles = await prisma.profile.findMany();

    res.status(200).json(profiles);
});

//@desc Get one profile
//@route GET /api/profile/:id
//@access Private
const getAProfile = asyncHandler(async (req, res, next) => {
    const profile = await prisma.profile.findUnique({ where: {id: Number(req.params.id)} });

    res.status(200).json(profile);
});

//@desc Create a profile
//@route POST /api/profile/
//@access Private
const creatAProfile = asyncHandler(async (req, res, next) => {
    if(!req.body.first_name || !req.body.email ||
        !req.body.last_name || !req.body.password ||
        !req.body.phone_number){
        res.status(400);
        throw new Error('Missing information');
    }

    const profile = await prisma.profile.create({
        data: {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            phone_number: req.body.phone_number,
        },
    });

    res.status(201).json(profile);
});

//@desc update an profile
//@route PUT /api/article/:id
//@access Private
const updateAProfile = asyncHandler(async (req, res, next) => {

    const profile = await prisma.profile.findUnique({ where: {id: Number(req.params.id)} });

    if(!profile){
        res.status(400);
        throw new Error('Profile not found');
    }

    const updatedProfile = await prisma.profile.update({
        where: {
            id:  Number(req.params.id)
        },
        data: req.body});

    res.status(200).json(updatedProfile);
});

//@desc delete a profile
//@route DELETE /api/profile/:id
//@access Private
const deleteAProfile = asyncHandler(async (req, res, next) => {

    const profile = await prisma.profile.findUnique({ where: {id: Number(req.params.id)} });

    if(!profile){
        res.status(400);
        throw new Error('Restaurant not found');
    }

    const deletedProfile = await prisma.profile.update({ where: {id: Number(req.params.id)}, data: {
        deletedAt: now()} });

    res.status(200).json(deletedProfile);
});        

module.exports = {
    getProfiles,
    getAProfile,
    creatAProfile,
    updateAProfile,
    deleteAProfile
}
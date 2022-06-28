const asyncHandler = require ("express-async-handler");
const { PrismaClient } = require('@prisma/client');
const { now } = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

    if(!profile){
        res.status(400);
        throw new Error('Invalid profile'); 
    }
    res.status(200).json(profile);
    
});

//@desc Register a user
//@route POST /api/profile/
//@access Private
const registerUser = asyncHandler(async (req, res, next) => {
    if(!req.body.first_name || !req.body.email ||
        !req.body.last_name || !req.body.password ||
        !req.body.phone_number || !req.body.roleId){
        res.status(400);
        throw new Error('Missing information');
    }

    if(await prisma.profile.findUnique({ where: {email: req.body.email } })){
        res.status(400);
        throw new Error('Profile already exist');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const profile = await prisma.profile.create({
        data: {
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: hashedPassword,
            phone_number: req.body.phone_number,
            roleId: Number(req.body.roleId),
        },
    });
    const role = await prisma.role.findUnique({where: {id: profile.roleId}});
    if(!role){
        res.status(400);
        throw new Error('Role not found');
    }
    let payload = { id: profile.id, permissions: role.name };

    if(profile){
        res.status(201).json({
            _id: profile.id,
            email: profile.email,
            first_name: profile.first_name,
            last_name: profile.last_name,
            password: profile.password,
            phone_number: profile.phone_number,
            roleId: profile.roleId,
            token: generateToken(payload),
        });
    }else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//@desc login a profile
//@route POST /api/profile/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {

    const profile = await prisma.profile.findUnique({ where: {email: req.body.email } });
    const permission = getPermision(profile)
    console.log(permission)
    let payload = { id: profile.id, permissions: [permission] };

    if(profile && (await bcrypt.comparer(req.body.password, profile.password))){
        res.status(201).json({
            _id: profile.id,
            email: profile.email,
            first_name: profile.first_name,
            last_name: profile.last_name,
            password: profile.password,
            phone_number: profile.phone_number,
            roleId: profile.roleId,
            token: generateToken(payload),
        });
    }else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

//@desc update an profile
//@route PUT /api/profile/:id
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

    if(!await prisma.profile.findUnique({ where: {id: Number(req.params.id)} })){
        res.status(400);
        throw new Error('Restaurant not found');
    }

    const deletedProfile = await prisma.profile.update({ where: {id: Number(req.params.id)}, data: {
        deletedAt: now()} });

    res.status(200).json(deletedProfile);
});        

const generateToken = (payload) => {
    return jwt.sign({ payload }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

const getPermission = asyncHandler(async (profile) => {
    const role = await prisma.role.findUnique({where: {id: profile.role_id}});
    return String(role.name);
});



module.exports = {
    getProfiles,
    getAProfile,
    registerUser,
    updateAProfile,
    deleteAProfile,
    loginUser,
}
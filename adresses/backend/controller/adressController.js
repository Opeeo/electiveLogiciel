const asyncHandler = require ("express-async-handler");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

//@desc Get adresses
//@route GET /api/adress/
//@access Private
const getAdresses = asyncHandler(async (req, res, next) => {
    const adresses = await prisma.adress.findMany();

    res.status(200).json(adresses);
});

//@desc Get one adress
//@route GET /api/adress/:id
//@access Private
const getAnAdress = asyncHandler(async (req, res, next) => {
    const adress = await prisma.adress.findUnique({ where: {id: Number(req.params.id)} });

    res.status(200).json(adress);
});

//@desc Create an adress
//@route POST /api/adress/
//@access Private
const creatAnAdress = asyncHandler(async (req, res, next) => {
    if(!req.body.street_number || !req.body.street_name ||
        !req.body.postal_code || !req.body.city){
        res.status(400);
        throw new Error('Missing information');
    }

    const adress = await prisma.adress.create({
        data: {
            street_number: Number(req.body.street_number),
            street_name: req.body.street_name,
            postal_code: Number(req.body.postal_code),
            city: req.body.city
        },
    });

    res.status(201).json(adress);
});

//@desc update an adress
//@route PUT /api/adress/:id
//@access Private
const updateAnAdress = asyncHandler(async (req, res, next) => {

    const adress = await prisma.adress.findUnique({ where: {id: Number(req.params.id)} });

    if(!adress){
        res.status(400);
        throw new Error('Profile not found');
    }

    const updatedAdress = await prisma.adress.update({
        where: {
            id:  Number(req.params.id)
        },
        data: req.body});

    res.status(200).json(updatedAdress);
});

//@desc delete an adress
//@route DELETE /api/adress/:id
//@access Private
const deleteAnAdress = asyncHandler(async (req, res, next) => {

    const adress = await prisma.adress.findUnique({ where: {id: Number(req.params.id)} });

    if(!adress){
        res.status(400);
        throw new Error('Restaurant not found');
    }

    const deletedAdress = await prisma.adress.delete({ where: {id: Number(req.params.id)} });

    res.status(200).json(deletedAdress);
}); 
module.exports = {
    getAdresses,
    getAnAdress,
    creatAnAdress,
    updateAnAdress,
    deleteAnAdress
}
const asyncHandler = require ("express-async-handler");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

//@desc Get consumer
//@route GET /api/profile/consumer/
//@access Private
const getConsumer = asyncHandler(async (req, res, next) => {
    const consumer = await prisma.consumer.findMany();

    res.status(200).json(consumer);
});

//@desc Get one consumer
//@route GET /api/profile/consumer/:id
//@access Private
const getAConsumer = asyncHandler(async (req, res, next) => {

    const consumer = await prisma.consumer.findUnique({ where: {profileId: Number(req.params.id)}})
    if(!consumer){
        res.status(400)
        throw new Error('Invalid consumer')
    }
    res.status(200).json(consumer);   
});


//@desc Create a consumer
//@route POST /api/profile/consumer/
//@access Private
const createAConsumer = asyncHandler(async (req, res, next) => {
    if(!req.body.profile_id){
        res.status(400);
        throw new Error('Missing information');
    }
    
    if(!await prisma.profile.findUnique({ where: {id: Number(req.body.profile_id)} })){
        res.status(400)
        throw new Error('Invalid profile')
    }

    const consumer = await prisma.consumer.create({
        data: {
            profileId: Number(req.body.profile_id),
            delevery_notification: Boolean(req.body.delevery_notification),
            promotionnal_notification: Boolean(req.body.promotionnal_notification),
            promotionnal_email: Boolean(req.body.promotionnal_notification)
        },
    });

    res.status(201).json(consumer);

});

//@desc update a consumer
//@route PUT /api/profile/consumer/:id
//@access Private
const updateAConsumer = asyncHandler(async (req, res, next) => {

    if(!await prisma.consumer.findUnique({ where: {profileId: Number(req.params.id)}})){
        res.status(400);
        throw new Error('Consumer not found');
    }

    const updatedConsumer = await prisma.consumer.update({
        where: {
            profileId: Number(req.params.id),
        },
        data: req.body});

    res.status(200).json(updatedConsumer);
});

//@desc delete a consumer
//@route DELETE /api/profile/consumer/:id
//@access Private
const deleteAConsumer = asyncHandler(async (req, res, next) => {
    if(!await prisma.consumer.findUnique({ where: {profileId: Number(req.params.id)}})){
        res.status(400);
        throw new Error('Consumer not found');
    }

    const deletedConsumer = await prisma.consumer.delete({where: {profileId: Number(req.params.id)}});

    res.status(200).json(deletedConsumer);
}); 

module.exports = {
    getConsumer,
    getAConsumer,
    createAConsumer,
    updateAConsumer,
    deleteAConsumer,
}
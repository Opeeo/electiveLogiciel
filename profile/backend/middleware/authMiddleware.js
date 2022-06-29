const jwt = require('jsonwebtoken');
const asyncHandler = require ("express-async-handler");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const protect = asyncHandler(async(req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await prisma.profile.findUnique({ where: {id: Number(decoded.id)} });

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized');
        }
    }

    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token')
    }
});

const IsConsumer = asyncHandler(async (req, res, next) => {
    const role = await prisma.role.findUnique({where: {id: Number(req.user.roleId)}});
    if(role){
        if(role.name == "consumer"){
            res.status(200);
            next();
        }else{
            res.status(401);
            throw new Error('Not authorized, not consumer');
        }
    }
});
const IsDeliveryman = asyncHandler(async (req, res, next) => {
    const role = await prisma.role.findUnique({where: {id: Number(req.user.roleId)}});
    if(role){
        if(role.name == "deliveryman"){
            res.status(200);
            next();
        }else{
            res.status(401);
            throw new Error('Not authorized, not deliveryman');
        }
    }
});
const IsDeveloper = asyncHandler(async (req, res, next) => {
    const role = await prisma.role.findUnique({where: {id: Number(req.user.roleId)}});
    if(role){
        if(role.name == "developer"){
            res.status(200);
            next();
        }else{
            res.status(401);
            throw new Error('Not authorized, not developer');
        }
    }
});
const IsRestaurantOwner = asyncHandler(async (req, res, next) => {
    const role = await prisma.role.findUnique({where: {id: Number(req.user.roleId)}});
    if(role){
        if(role.name == "restaurant_owner"){
            res.status(200);
            next();
        }else{
            res.status(401);
            throw new Error('Not authorized, not restaurator');
        }
    }
});


module.exports = {
    protect,
    IsConsumer,
    IsDeliveryman,
    IsDeveloper,
    IsRestaurantOwner,
}
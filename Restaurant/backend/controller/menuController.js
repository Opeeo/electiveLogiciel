const asyncHandler = require ("express-async-handler");
const Menu = require("../models/menuModel");

//@desc Get menus of a restaurant
//@route GET /api/menu/:id_restaurant
//@access Private
const getMenus = asyncHandler(async (req, res, next) => {
    const menus = await Menu.find({"id_restaurant": req.params.id_restaurant});

    res.status(200).json(menus);
});

//@desc Create a menu
//@route POST /api/menu/
//@access Private
const createAMenu = asyncHandler(async (req, res, next) => {
    if(!req.body.name || !req.body.id_restaurant) {
        res.status(400);
        throw new Error('Please provide an id of a restaurant or a restaurant name');
    }

    const menu = await Menu.create(req.body);

    res.status(200).json(menu);
});

//@desc update a menu
//@route PUT /api/menu/:id
//@access Private
const updateAMenu = asyncHandler(async (req, res, next) => {

    const menu = await Menu.findById(req.params.id);

    if(!menu){
        res.status(400);
        throw new Error('Article not found');
    }

    const updatedMenu = await Menu.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedMenu);
});

//@desc delete a menu
//@route DELETE /api/menu/:id
//@access Private
const deleteAMenu = asyncHandler(async (req, res, next) => {

    const menu = await Menu.findById(req.params.id);

    if(!menu){
        res.status(400);
        throw new Error('Restaurant not found');
    }

    const deletedMenu =await Menu.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedMenu);
});

module.exports = {
    getMenus,
    createAMenu,
    updateAMenu,
    deleteAMenu
}
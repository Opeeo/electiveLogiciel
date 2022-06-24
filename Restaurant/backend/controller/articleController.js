const asyncHandler = require ("express-async-handler");
const Article = require("../models/articleModel");

//@desc Get articles of a restaurant
//@route GET /api/article/:id_restaurant
//@access Private
const getArticles = asyncHandler(async (req, res, next) => {
    const articles = await Article.find({"id_restaurant": req.params.id_restaurant});

    res.status(200).json(articles);
});

//@desc Create an article
//@route POST /api/article/
//@access Private
const createAnArticle = asyncHandler(async (req, res, next) => {
    if(!req.body.name || !req.body.id_restaurant) {
        res.status(400);
        throw new Error('Please provide an id of a restaurant or a restaurant name');
    }

    const article = await Article.create(req.body);

    res.status(201).json(article);
});

//@desc update an article
//@route PUT /api/article/:id
//@access Private
const updateAnArticle = asyncHandler(async (req, res, next) => {

    const article = await Article.findById(req.params.id);

    if(!article){
        res.status(400);
        throw new Error('Article not found');
    }

    const updatedArticle = await article.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedArticle);
});

//@desc delete an article
//@route DELETE /api/article/:id
//@access Private
const deleteAnArticle = asyncHandler(async (req, res, next) => {

    const article = await Article.findById(req.params.id);

    if(!article){
        res.status(400);
        throw new Error('Restaurant not found');
    }

    const deletedArticle =await Article.findByIdAndDelete(req.params.id);

    res.status(200).json(deletedArticle);
});



module.exports = {
    getArticles,
    createAnArticle,
    updateAnArticle,
    deleteAnArticle
}
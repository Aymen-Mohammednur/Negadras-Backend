const Category = require('../models/Category')

const getAllCategories = async (request, response) => {

    try {
        const categories = await Category.find();
        response.status(200).json(categories);
    } catch (error) {
        response.json({ message: error });
    }
}

const postCategory = async (request, response) => {

    const category = new Category(request.body);

    try {
        const addedCategory = await category.save();
        response.status(201).json(addedCategory);
    } catch (error) {
        response.json({ message: error });
    }
}

const getOneCategory = async (request, response) => {

    try {
        const id = request.params.id;
        const category = await Category.findById(id);
        response.status(200).json(category);
    } catch (error) {
        response.json({ message: error });
    }
}




module.exports = {
    getAllCategories,
    postCategory,
    getOneCategory,
    
}
const Category = require('../models/Category');
const { categoryValidation } = require("../middlewares/validation");

const getAllCategories = async (request, response) => {

    try {
        const categories = await Category.find();
        response.status(200).json(categories);
    } catch (error) {
        response.json({ message: error });
    }
}

const postCategory = async (request, response) => {
    const { error } = categoryValidation(req.body);
    if (error) {
        // console.log("ERROR: ", error);
        return res.status(400).send({ message: error.details[0].message });
    }
    
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


const editCategory = async (request, response) => {
    const { error } = categoryValidation(req.body);
    if (error) {
        // console.log("ERROR: ", error);
        return res.status(400).send({ message: error.details[0].message });
    }
    
    try {
        const id = request.params.id;
        const updatedCategory = await Category.findByIdAndUpdate(id, request.body, {
            new: true,
            runValidators: true,
        });
        response.status(200).json(updatedCategory);
    } catch (error) {
        response.status(404).json({ message: error });
    }
}

const deleteCategory = async (request, response) => {

    try {
        const id = request.params.id;
        const removedCategory = await Category.findByIdAndDelete(id);
        response.status(204).json(removedCategory);
    } catch (error) {
        response.json({ message: error });
    }
}

module.exports = {
    getAllCategories,
    postCategory,
    getOneCategory,
    editCategory,
    deleteCategory
}
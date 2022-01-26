const Category = require('../models/CategoryModel');
const { categoryValidation } = require("../middlewares/validation");

const getAllCategories = async (request, response) => {

    try {
        const categories = await Category.find();
        response.status(200).json(categories);
    } catch (error) {
        response.json({ message: error });
    }
};

const postCategory = async (request, response) => {
    const { error } = categoryValidation(request.body);
    if (error) {
        // console.log("ERROR: ", error);
        return response.status(400).send({ message: error.details[0].message });
    }
    
    const category = new Category(request.body);

    try {
        const addedCategory = await category.save();
        response.status(201).json(addedCategory);
    } catch (e) {
        response.json({ message: e });
    }
};

const getOneCategory = async (request, response) => {

    try {
        const id = request.params.id;
        const category = await Category.findById(id);
        response.status(200).json(category);
    } catch (error) {
        response.json({ message: error });
    }
};


const editCategory = async (request, response) => {
    const { error } = categoryValidation(request.body);
    if (error) {
        // console.log("ERROR: ", error);
        return response.status(400).send({ message: error.details[0].message });
    }
    
    try {
        const id = request.params.id;
        const updatedCategory = await Category.findByIdAndUpdate(id, request.body, {
            new: true,
            runValidators: true,
        });
        response.status(200).json(updatedCategory);
    } catch (e) {
        response.status(404).json({ message: e });
    }
};

const deleteCategory = async (request, response) => {

    try {
        const id = request.params.id;
        const removedCategory = await Category.findByIdAndDelete(id);
        response.status(204).json(removedCategory);
    } catch (err) {
        response.json({ message: err });
    }
};

module.exports = {
    getAllCategories,
    postCategory,
    getOneCategory,
    editCategory,
    deleteCategory
};
const Category = require('../models/Category')

const getAllCategories = async (request, response) => {

    try {
        const categories = await Category.find();
        response.status(200).json(categories);
    } catch (error) {
        response.json({ message: error });
    }
}

module.exports = {
    getAllCategories
}
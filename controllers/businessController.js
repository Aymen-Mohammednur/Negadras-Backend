const Business = require('../models/Business');

const postBusiness = async (request, response) => {
    // response.send("POST business");

    console.log(request.body);

    const business = new Business(request.body);

    try {
        const addedBusiness = await business.save();
        response.status(201).json(addedBusiness);
    } catch (error) {
        response.json({ message: error });
    }
}

const getAllBusiness = async (request, response) => {
    // response.send("GET business");

    try {
        const business = await Business.find();
        response.status(200).json(business);
    } catch (error) {
        response.json({ message: error });
    }
}

const getOneBusiness = async (request, response) => {
    // response.send("GET specific business");

    try {
        const id = request.params.id;
        const business = await Business.findById(id);
        response.status(200).json(business);
    } catch (error) {
        response.json({ message: error });
    }
}

const getBusinessByCategory = async (request, response) => {
    try {
        const categoryId = request.params.categoryId;
        const business = await Business.find({ categoryId: categoryId });
        response.status(200).json(business);

    } catch (error) {
        response.json({ message: error });
    }
}


const searchBusiness = async (request, response) => {
    try {
        const query = request.params.query;
        const business = await Business.find({ $or: [{ name: query }, { location: query }, { phoneNumber: query }, { website: query }, { email: query }] });
        response.status(200).json(business);
    } catch (error) {
        response.jsom({ message: error });
    }
}

const editBusiness = async (request, response) => {
    // response.send("PUT business");

    try {
        const id = request.params.id;
        // const updatedBusiness = await Business.updateOne({ _id: id }, { $set: {title: request.body.title} });
        const updatedBusiness = await Business.findByIdAndUpdate(id, request.body, {
            new: true,
            runValidators: true,
        });
        response.status(200).json(updatedBusiness);
    } catch (error) {
        response.json({ message: error });
    }
}

const deleteBusiness = async (request, response) => {

    try {
        const id = request.params.id;
        // const removedBusiness = await business.findByIdAndDelete(id);
        // const removedBusiness = await Business.remove({ _id: id });
        const removedBusiness = await Business.findByIdAndDelete(id);
        response.status(204).json(removedBusiness);
    } catch (error) {
        response.json({ message: error });
    }

    // business.findByIdAndDelete(id)
    //     .then(result => {
    //         response.status(204).json(result);
    //     })
    //     .catch(error => {
    //         response.json({ message: error });
    //     })
}



module.exports = {
    postBusiness,
    getAllBusiness,
    getOneBusiness,
    editBusiness,
    deleteBusiness,
    getBusinessByCategory,
    searchBusiness
}
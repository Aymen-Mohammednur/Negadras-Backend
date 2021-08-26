const Buisness = require('../models/Business');

const postBuisness = async (request, response) => {
    // response.send("POST buisness");

    console.log(request.body);

    const buisness = new Buisness(request.body);

    try {
        const addedBuisness = await buisness.save(); 
        response.status(201).json(addedBuisness);
    } catch (error) {
        response.json({ message: error });
    }
}

const getAllBuisness = async (request, response) => {
    // response.send("GET buisness");

    try {
        const buisness = await Buisness.find();
        response.status(200).json(buisness);
    } catch (error) {
        response.json({ message: error });
    }
}

const getOneBuisness = async (request, response) => {
    // response.send("GET specific buisness");

    try {
        const id = request.params.id;
        const buisness = await Buisness.findById(id);
        response.status(200).json(buisness);
    } catch (error) {
        response.json({ message: error });
    }
}

const editBuisness = async (request, response) => {
    // response.send("PUT buisness");

    try {
        const id = request.params.id;
        // const updatedBuisness = await Buisness.updateOne({ _id: id }, { $set: {title: request.body.title} });
        const toBeUpdated = await Buisness.findById(id);
        toBeUpdated.sub = request.body.sub;
        const updatedBuisness = await Buisness.save();
        response.status(200).json(updatedBuisness);
    } catch (error) {
        response.json({ message: error });
    }
}

const deleteBuisness = async (request, response) => {
    // response.send("DELETE buisness");

    try {
        const id = request.params.id;
        // const removedBuisness = await Buisness.findByIdAndDelete(id);
        const removedBuisness = await Buisness.remove({ _id: id });
        response.status(204).json(removedBuisness);
    } catch (error) {
        response.json({ message: error });
    }

    // Buisness.findByIdAndDelete(id)
    //     .then(result => {
    //         response.status(204).json(result);
    //     })
    //     .catch(error => {
    //         response.json({ message: error });
    //     })
}

module.exports = {
    postBuisness,
    getAllBuisness,
    getOneBuisness,
    editBuisness,
    deleteBuisness
}
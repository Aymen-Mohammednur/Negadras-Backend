const Review = require('../models/Review');

const postReview = async (request, response) => {
    const review = new Review(request.body);

    try {
        const addedReview = await review.save();
        response.status(201).json(addedReview);
    } catch (error) {
        response.json({ message: error });
    }
}

const getAllReview = async (request, response) => {
    try {
        const review = await Review.find();
        response.status(200).json(review);
    } catch (error) {
        response.json({ message: error });
    }
}

const editReview = async (request, response) => {

    try {
        const id = request.params.id;
        const toBeUpdated = await Review.findById(id);
        toBeUpdated.sub = request.body.sub;
        const updatedReview = await Review.save();
        response.status(200).json(updatedReview);
    } catch (error) {
        response.json({ message: error });
    }
}

const deleteReview = async (request, response) => {
    try {
        const id = request.params.id;
        const removedReview = await Review.remove({ _id: id });
        response.status(204).json(removedReview);
    } catch (error) {
        response.json({ message: error });
    }
}

module.exports = {
    postReview,
    getAllReview,
    editReview,
    deleteReview
}
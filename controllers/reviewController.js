const Review = require('../models/ReviewModel');
const User = require('../models/UserModel');
const { reviewValidation } = require('../middlewares/validation');

const postReview = async (request, response) => {
    const { error } = reviewValidation(request.body);

    if (error) {
        // console.log("ERROR: ", error);
        return response.status(400).send({ message: error.details[0].message });
    }
    const review = new Review(request.body);

    try {
        const addedReview = await review.save();
        response.status(201).json(addedReview);
    } catch (e) {
        response.json({ message: e });
    }
};

const getAllReview = async (request, response) => {
    try {
        const reviews = await Review.find();
        response.status(200).json(reviews);
    } catch (error) {
        response.json({ message: error });
    }
};

const getOneReview = async (request, response) => {
    // response.send("GET specific business");

    try {
        const id = request.params.id;
        const review = await Review.findById(id);
        response.status(200).json(review);
    } catch (error) {
        response.json({ message: error });
    }
};

const editReview = async (request, response) => {
    const { error } = reviewValidation(request.body);

    if (error) {
        // console.log("ERROR: ", error);
        return response.status(400).send({ message: error.details[0].message });
    }
    try {
        const id = request.params.id;
        const updatedReview = await Review.findByIdAndUpdate(id, request.body, {
            new: true,
            runValidators: true,
        });
        response.status(200).json(updatedReview);
    } catch (err) {
        response.json({ message: err });
    }
};

const patchReview = async (request, response) => {
    try {
        const id = request.params.id;
        const patchedReview = await Review.updateOne({ _id: id }, { $set: { reviewText: request.body.reviewText } });
        response.status(200).json(patchedReview);
    } catch (error) {
        response.json({ message: error });
    }
};

const deleteReview = async (request, response) => {
    try {
        const id = request.params.id;
        const removedReview = await Review.remove({ _id: id });
        response.status(204).json(removedReview);
    } catch (error) {
        response.json({ message: error });
    }
};

const getReviewByBusiness = async (request, response) => {
    try {
        const businessId = request.params.businessId;
        const reviews = await Review.find({ businessId: businessId });
        // console.log(reviews[0]);

        // const result = await reviews.map((value)=>{
        //     const user = await User.findById(value.userId);
        //     return {...value, user.username};
        // })
        resultArray = [];
        for (let i = 0; i < reviews.length; i++) {
            // console.log(reviews[i]);
            const user = await User.findById(reviews[i].userId);
            console.log(user);
            resultArray.push({...reviews[i]._doc, username: user.username});
        }
        // some loop
        response.status(200).send(resultArray);

    } catch (error) {
        response.json({ message: error });
    }
};
module.exports = {
    postReview,
    getAllReview,
    editReview,
    deleteReview,
    patchReview,
    getOneReview,
    getReviewByBusiness
};
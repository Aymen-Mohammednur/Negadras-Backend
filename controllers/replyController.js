const Reply = require('../models/Reply');
const { replyValidation } = require('../middlewares/validation');

const postReply = async (request, response) => {
    const { error } = replyValidation(req.body);

    if (error) {
        // console.log("ERROR: ", error);
        return res.status(400).send({ message: error.details[0].message });
    }
    const reply = new Reply(request.body);

    try {
        const addedReply = await reply.save();
        response.status(201).json(addedReply);
    } catch (error) {
        response.json({ message: error });
    }
}

const getAllReply = async (request, response) => {
    try {
        const replies = await Reply.find();
        response.status(200).json(replies);
    } catch (error) {
        response.json({ message: error });
    }
}

const getOneReply = async (request, response) => {

    try {
        const id = request.params.id;
        const reply = await Reply.findById(id);
        response.status(200).json(reply);
    } catch (error) {
        response.json({ message: error });
    }
}

const editReply = async (request, response) => {
    const { error } = replyValidation(req.body);

    if (error) {
        // console.log("ERROR: ", error);
        return res.status(400).send({ message: error.details[0].message });
    }

    try {
        const id = request.params.id;
        const updatedReply = await Reply.findByIdAndUpdate(id, request.body, {
            new: true,
            runValidators: true,
        });
        response.status(200).json(updatedReply);
    } catch (error) {
        response.json({ message: error });
    }
}

const patchReply = async (request, response) => {
    try {
        const id = request.params.id;
        const patchedReply = await Reply.updateOne({ _id: id }, { $set: { replyText: request.body.replyText } });
        response.status(200).json(patchedReply);
    } catch (error) {
        response.json({ message: error });
    }
}

const deleteReply = async (request, response) => {
    try {
        const id = request.params.id;
        const removedReply = await Review.remove({ _id: id });
        response.status(204).json(removedReply);
    } catch (error) {
        response.json({ message: error });
    }
}

module.exports = {
    postReply,
    getAllReply,
    getOneReply,
    deleteReply,
    editReply,
    patchReply
}

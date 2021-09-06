const User = require('../models/User');
const bcrypt = require("bcryptjs");

const getAllUsers = async (request, response) => {
    try {
        const user = await User.find();
        response.status(200).json(user);
    } catch (error) {
        response.json({ error: error });
    }
}

const getOneUser = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await User.findById(id);
        response.status(200).json(user);
    } catch (error) {
        response.json({ error: error });
    }
}

const editUser = async (request, response) => {
    try {
        const editedUser = await User.findByIdAndUpdate(id, request.body, {
            new: true,
            runValidators: true,
        });
        response.status(200).json(editedUser);
    } catch (error) {
        response.json({ error: error });
    }
}

const changeUsername = async (request, response) => {
    // checking if the username already exists
    const usernameExists = await User.findOne({ username: request.body.username });
    if (usernameExists) {
        return response.status(400).send({ error: "The username is already taken" });
    }
    try {
        const id = request.params.id;
        const changedUsernameUser = await User.updateOne({ _id: id }, { $set: { username: request.body.username } });
        response.status(200).send(changedUsernameUser);
    } catch (error) {
        response.status(400).json({ error: error });
    }
}

const changePassword = async (request, response) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {
        const id = request.params.id;
        const changedPasswordUser = await User.updateOne({ _id: id }, { $set: { password: hashedPassword } });
        response.status(200).send(changedPasswordUser);
    } catch (error) {
        response.status(400).json({ error: error });
    }
}

const upgradeUserToOwner = async (request, response) => {
    try {
        const id = request.params.id;
        const patchedUser = await User.updateOne({ _id: id }, { $set: { role: request.body.role } });
        response.status(200).json(patchedUser);
    } catch (error) {
        response.json({ error: error });
    }
}


const deleteUser = async (request, response) => {
    try {
        const id = request.params.id;
        const removedUser = await User.remove({ _id: id });
        response.status(204).json(removedUser);
    } catch (error) {
        response.json({ error: error });
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    editUser,
    deleteUser,
    upgradeUserToOwner,
    changeUsername,
    changePassword
}

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
        // const changedUsernameUser = await User.findByIdAndUpdate(id, request.body, {
        //     new: true,
        //     runValidators: true
        // });
        const changedUsernameUser = await User.findById(id);
        changedUsernameUser.username = request.body.username;
        changedUsernameUser.save();
        // console.log(changedUsernameUser);
        response.status(200).send(changedUsernameUser);
    } catch (error) {
        response.status(400).json({ error: error });
    }
}

const changePassword = async (request, response) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    try {
        const id = request.params.id;
        const changedPasswordUser = await User.findById(id);
        const validPass = await bcrypt.compare(request.body.password, changedPasswordUser.password);
        // console.log(validPass);
        if (validPass) {
            return response.status(400).send({ message: "Same password detected, enter a different one" });
        }
        changedPasswordUser.password = hashedPassword;
        changedPasswordUser.save();
        response.status(200).send(changedPasswordUser);
    } catch (error) {
        response.status(400).json({ error: error });
    }
}

const upgradeUserToOwner = async (request, response) => {
    try {
        const id = request.params.id;
        // const patchedUser = await User.updateOne({ _id: id }, { $set: { role: request.body.role } });
        const patchedUser = await User.findById(id);
        patchedUser.role = "Owner";
        patchedUser.save();
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
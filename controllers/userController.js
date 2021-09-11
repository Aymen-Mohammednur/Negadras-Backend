const User = require('../models/User');
const bcrypt = require("bcryptjs");
const Owner = require('../models/Owner');

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
        response.status(400).json({ message: error });
    }
}

const changePassword = async (request, response) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.newPassword, salt);

    try {
        const id = request.params.id;
        const changedPasswordUser = await User.findById(id);
        const oldPassValid = await bcrypt.compare(request.body.oldPassword, changedPasswordUser.password);
        if (!oldPassValid) {
            return response.status(400).send({ message: "Current password is not correct" });
        }
        const newPassValid = await bcrypt.compare(request.body.newPassword, changedPasswordUser.password);
        if (newPassValid) {
            return response.status(400).send({ message: "Same password detected, enter a different one" });
        }
        changedPasswordUser.password = hashedPassword;
        changedPasswordUser.save();
        response.status(200).send(changedPasswordUser);
    } catch (error) {
        response.status(400).json({ message: error });
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
        response.json({ message: error });
    }
}


const deleteUser = async (request, response) => {
    try {
        const id = request.params.id;
        const toBeDeleted = await User.findById(id);
        const validPass = await bcrypt.compare(request.body.password, toBeDeleted.password);
        if (!validPass) {
            return response.status(400).send({ message: "The password you entered is not correct" });
        }
        const deleted = await User.findByIdAndDelete(id);
        response.status(204).json(deleted);
    } catch (error) {
        response.json({ error: error });
    }
}

const makeClaim = async (request, response) => {
    const owner = new Owner(request.body);

    try {
        console.log("owner from model: ", owner);
        const businessIdExists = await Owner.findOne({ businessId: request.body.businessId })
        if (businessIdExists) {
            return response.status(400).send({ message: "Is already owned" });
        }
        const userId = request.body.userId
        const patchedUser = await User.findById(userId);
        patchedUser.role = "Owner";
        patchedUser.save();
        const addedOwner = await owner.save();
        console.log("added owner: ", addedOwner);
        response.status(201).send(addedOwner);
    } catch (error) {
        console.log("error while adding owner: ", error);
        response.status(404).json({ message: error });
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    editUser,
    deleteUser,
    upgradeUserToOwner,
    changeUsername,
    changePassword,
    makeClaim
}
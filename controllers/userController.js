const User = require('../models/User');

const createUser = async (request, response) => {
    const user = new User(request.body);

    try {
        const createdUser = await user.save();
        response.status(201).json(createdUser);
    } catch (error) {
        response.json({ message: error });
    }
}

const getAllUsers = async (request, response) => {
    try {
        const user = await User.find();
        response.status(200).json(user);
    } catch (error) {
        response.json({ message: error });
    }
}

const getOneUser = async (request, response) => {
    try {
        const id = request.params.id;
        const user = await User.findById(id);
        response.status(200).json(user);
    } catch (error) {
        response.json({ message: error });
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
        response.json({ message: error });
    }
}

const upgradeUserToOwner = async (request, response) => {
    try {
        const patchedUser = await User.updateOne({ _id: id }, { $set: {role: request.body.role} });
        response.status(200).json(patchedUser);
    } catch (error) {
        response.json({ message: error });
    }
}


const deleteUser = async (request, response) => {
    try {
        const id = request.params.id;
        const removedUser = await User.remove({ _id: id });
        response.status(204).json(removedUser);
    } catch (error) {
        response.json({ message: error });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    editUser,
    deleteUser,
    upgradeUserToOwner
}
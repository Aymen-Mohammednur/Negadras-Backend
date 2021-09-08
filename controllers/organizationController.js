const Organization = require('../models/Organization')

const getAllOrganizations = async (request, response) => {

    try {
        const organizations = await Organization.find();
        response.status(200).json(organizations);
    } catch (error) {
        response.json({ message: error });
    }
}

const postOrganization = async (request, response) => {

    const organization = new Organization(request.body);

    try {
        const addedOrganization = await organization.save();
        response.status(201).json(addedOrganization);
    } catch (error) {
        response.json({ message: error });
    }
}

const getOneOrganization = async (request, response) => {

    try {
        const id = request.params.id;
        const organization = await Organization.findById(id);
        response.status(200).json(organization);
    } catch (error) {
        response.json({ message: error });
    }
}


const editOrganization = async (request, response) => {

    try {
        const id = request.params.id;
        const updatedOrganization = await Organization.findByIdAndUpdate(id, request.body, {
            new: true,
            runValidators: true,
        });
        response.status(200).json(updatedOrganization);
    } catch (error) {
        response.status(404).json({ message: error });
    }
}

const deleteOrganization = async (request, response) => {

    try {
        const id = request.params.id;
        const removedOrganization = await Organization.findByIdAndDelete(id);
        response.status(204).json(removedOrganization);
    } catch (error) {
        response.json({ message: error });
    }
}

module.exports = {
    getAllOrganizations,
    postOrganization,
    getOneOrganization,
    editOrganization,
    deleteOrganization
}
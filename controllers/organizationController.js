const Organization = require('../models/Organization');
const { organizationValidation } = require("../middlewares/validation");
const { request, response } = require('express');

const getAllOrganizations = async (request, response) => {

    try {
        const organizations = await Organization.find();
        
        if (organizations.length == 0) {
            return response.status(404).send({ message: "No organizations found" });
        }
        response.status(200).json(organizations);
    } catch (error) {
        response.json({ message: error });
    }
}

const postOrganization = async (request, response) => {
    const { error } = organizationValidation(request.body);

    if (error) {
        // console.log("ERROR: ", error);
        return response.status(400).send({ message: error.details[0].message });
    }
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
    // const { error } = organizationValidation(request.body);

    // if (error) {
    //     // console.log("ERROR: ", error);
    //     return response.status(400).send({ message: error.details[0].message });
    // }

    try {
        const id = request.params.id;
        // const updatedOrganization = await Organization.findByIdAndUpdate(id, request.body, {
        //     new: true,
        //     runValidators: true,
        // });
        const updatedOrganization = await Organization.findById(id);
        updatedOrganization.name = request.body.name;
        updatedOrganization.save();
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

const getOrgByUserId = async (request, response) => {
    try {
        const id = request.params.userId;
        const organizations = await Organization.find({ userId: id });
        if (organizations.length == 0) {
            return response.status(404).send({ message: "No organizations found for that user" });
        }
        response.status(200).json(organizations);
    } catch (error) {
        response.status(400).json({ message: error });
    }
}

module.exports = {
    getAllOrganizations,
    postOrganization,
    getOneOrganization,
    editOrganization,
    deleteOrganization,
    getOrgByUserId
}
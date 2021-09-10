const Business = require('../models/Business');
const { businessValidation  }= require('../middlewares/validation');
const Favorite = require('../models/Favorite');

const postBusiness = async (request, response) => {
    // response.send("POST business");

    // console.log(request.body);
    const {error} = businessValidation(request.body);
    if (error) {
        return response.status(400).send({ message: error.details[0].message });
    }

    const business = new Business(request.body);

    try {
        const addedBusiness = await business.save();
        response.status(201).json(addedBusiness);
    } catch (error) {
        response.json({ message: error });
    }
}

const getBusiness = async (request, response) => {
    // response.send("GET business");
    let { keyword } = request.query;
    let business;

    try {
        if (keyword) {
            business = await Business.find({ $text: { $search: keyword } });
        } else {
            business = await Business.find();
        }
        response.status(200).json(business);
    } catch (error) {
        response.json({ message: error });
    }
}

const getOneBusiness = async (request, response) => {
    // response.send("GET specific business");

    try {
        const id = request.params.id;
        const business = await Business.findById(id);
        if (!business) {
            return response.status(404).send({error: "Business not found"});
        }
        response.status(200).json(business);
    } catch (error) {
        response.json({ message: error });
    }
}

const getBusinessByCategory = async (request, response) => {
    try {
        const categoryId = request.params.categoryId;
        const userId = request.params.userId;
    
        // console.log(categoryId);
        // console.log(request.params);
        // console.log(request.params.categoryId);
        // console.log(request.params.userId);
        console.log("above");
        const business = await Business.find();
        console.log("here");
        // console.log(business[0]);
        const result = [];
        // business.forEach(element => {
        //     console.log('inside loop');
        //     console.log(element);
        // });
        for(let i = 0; i < business.length; i++){
            console.log('inside loop');
            const businessId = business[i]._id;
            console.log(business[i]);
            const favorite = await Favorite.find({ $and: [{ businessId: businessId }, { userId: userId }] });
            result.push({...business[i]._doc, isFavorite: Boolean(favorite)});
            
            // console.log({...business[i]._doc, isFavorite: Boolean(favorite)});
        }
        console.log("end");

        response.status(200).send(result);

    } catch (error) {
        response.json({ message: error });
    }
}


const searchBusiness = async (request, response) => {
    try {
        const query = request.params.query;
        const business = await Business.find({ $or: [{ name: query }, { location: query }, { phoneNumber: query }, { website: query }, { email: query }] });
        response.status(200).json(business);
    } catch (error) {
        response.jsom({ message: error });
    }
}

const editBusiness = async (request, response) => {
    // response.send("PUT business");
    const {error} = businessValidation(request.body);
    if (error) {
        return response.send({ message: error.details[0].message });
    }

    try {
        const id = request.params.id;
        // const updatedBusiness = await Business.updateOne({ _id: id }, { $set: {title: request.body.title} });
        const updatedBusiness = await Business.findByIdAndUpdate(id, request.body, {
            new: true,
            runValidators: true,
        });
        response.status(200).json(updatedBusiness);
    } catch (error) {
        response.json({ message: error });
    }
}

const deleteBusiness = async (request, response) => {

    try {
        const id = request.params.id;
        // const removedBusiness = await business.findByIdAndDelete(id);
        // const removedBusiness = await Business.remove({ _id: id });
        const removedBusiness = await Business.findByIdAndDelete(id);
        response.status(204).json(removedBusiness);
    } catch (error) {
        response.json({ message: error });
    }

    // business.findByIdAndDelete(id)
    //     .then(result => {
    //         response.status(204).json(result);
    //     })
    //     .catch(error => {
    //         response.json({ message: error });
    //     })
}

const addOrganizationToBusiness = async (request, response) => {
    try {
        const id = request.params.id;
        const orgId = request.body.organizationId;
        const business = await Business.updateOne({_id : id}, {$set: {organizationId: orgId}});
        if (!business) {
            return response.status(404).json({error: "Business not found"});
        }
    } catch(e) {
        response.status(400).json({error: error});
    }
}


module.exports = {
    postBusiness,
    getBusiness,
    getOneBusiness,
    editBusiness,
    deleteBusiness,
    getBusinessByCategory,
    searchBusiness,
    addOrganizationToBusiness
}
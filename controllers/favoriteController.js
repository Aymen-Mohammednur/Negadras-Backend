const Favorite = require('../models/Favorite');

const addToFavorites = async (request, response) => {
    
    // const {error} = businessValidation(request.body);
    // if (error) {
    //     return response.status(400).send({ message: error.details[0].message });
    // }

    const favorite = new Favorite(request.body);

    try {
        const addedFavorite = await favorite.save();
        response.status(201).json(addedFavorite);
    } catch (error) {
        response.json({ message: error });
    }
}

const removeFromFavorites = async (request, response) => {

    try {
        const id = request.params.id;
        // const removedBusiness = await business.findByIdAndDelete(id);
        // const removedBusiness = await Business.remove({ _id: id });
        const removedFavorite = await Favorite.findByIdAndDelete(id);
        response.status(204).json(removedFavorite);
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


module.exports = {
    addToFavorites,
    removeFromFavorites,
}
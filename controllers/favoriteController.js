const Favorite = require("../models/Favorite");

const addToFavorites = async (request, response) => {
  // const {error} = businessValidation(request.body);
  // if (error) {
  //     return response.status(400).send({ message: error.details[0].message });
  // }
  console.log("Let's add favorite");
  console.log(request.body);
  const favorite = new Favorite(request.body);

  try {
    console.log("favorite from model: ", favorite);
    const addedFavorite = await favorite.save();
    console.log("added favorite: ", addedFavorite);
    response.status(201).send(addedFavorite);
  } catch (error) {
    console.log("error while adding fav: ", error);
    response.json({ message: error });
  }
};

const removeFromFavorites = async (request, response) => {
  try {
    // const id = request.params.id;
    // const removedBusiness = await business.findByIdAndDelete(id);
    // const removedBusiness = await Business.remove({ _id: id });
    console.log("Let's delete favorites");
    console.log("Response.body: ", request.body);
    const bussinessId = request.body.businessId;
    const userId = request.body.userId;

    const removedFavorite = await Favorite.deleteOne({
      $and: [{ businessId: bussinessId }, { userId: userId }],
    });

    console.log("found the things to delete: ", removedFavorite);
    response.status(204).json(removedFavorite);
  } catch (error) {
    console.log("Error while deleting: ", error);
    response.json({ message: error });
  }

  // business.findByIdAndDelete(id)
  //     .then(result => {
  //         response.status(204).json(result);
  //     })
  //     .catch(error => {
  //         response.json({ message: error });
  //     })
};

module.exports = {
  addToFavorites,
  removeFromFavorites,
};

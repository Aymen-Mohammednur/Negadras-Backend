const Favorite = require("../models/FavoriteModel");

const addToFavorites = async (request, response) => {
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

// This function is only called by internal files.
// It is not linked to any of the URL routes.
const _getFavoritesByUserId = async (userId) => {
  try {
    var favorite = await Favorite.find({userId: userId});
    var favoriteIdList = [];
    for (var i = 0; i < favorite.length; i ++){
      favoriteIdList.push(favorite[i].businessId);
    }
    return favoriteIdList;
  } catch (error) {
    console.log("error in fav controller . js", error);
  }
};


const removeFromFavorites = async (request, response) => {
  try {
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

};

module.exports = {
  addToFavorites,
  removeFromFavorites,
  _getFavoritesByUserId
};

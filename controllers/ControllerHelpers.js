const Business = require("../models/BusinessModel");
const Favorite = require("../models/FavoriteModel");
const FavoriteController = require("./favoriteController");

var INITIALISED_TAG_LIST;

const calculateAttributeScoreForAllObjects = async () => {
    var businessList = await Business.find();
    businessList = shuffle(businessList);
    var mapping = {};
    
    for (var i = 0; i < businessList.length; i++){
        var business = businessList[i];
        mapping [business._id] = createTagMapping(business);
    }
    return mapping;
};

const  calculateUserProfile = async (userId, tagScores) => {
    userFavorites = await FavoriteController._getFavoritesByUserId(userId);
    
    var userProfile = generateProfile(userFavorites, tagScores);
    return(userProfile);
};

const  calculateIDF = async () => {
    var businessList = await Business.find();
    var l = businessList.length;
    var tagList = Object.assign({}, INITIALISED_TAG_LIST);
    var idfList = JSON.parse(JSON.stringify(tagList));
    for (var i = 0; i < businessList.length; i++){
        var business = businessList[i];
        for (var j = 0; j < business.tags.length; j++){
            var tag = business.tags[j];
            tagList[tag] += 1;
        }
    }
    for (const [tag, tagFrequency] of Object.entries(tagList)) {
        idfList[tag] = Math.log( (1 + businessList.length ) / (1+tagFrequency) ) + 1;
    }
    return (idfList);

};

const multiplyAndSort = (attributeScoreForAllObjects, userProfile, idfList) => {
   priorityDictionary = {};
    for (const [businessId, businessAttributesScore] of Object.entries(attributeScoreForAllObjects)) {
        var businessScore = 0;
        for (const [tag, tagScore] of Object.entries(businessAttributesScore)) {
            businessScore += (tagScore) * (userProfile[tag]) * (idfList[tag]);
            priorityDictionary[businessId] = businessScore;
        }
    }
    var sortedDictionary = Object.fromEntries(
        Object.entries(priorityDictionary).sort(([,a],[,b]) => b-a)
    );
    return sortedDictionary;
};

const convertIdsToBusinesses = async (businessIdList) => {
    var businessList = [];
    for (const [businessId, businessScore] of Object.entries(businessIdList)) {
      var b = await Business.findById(businessId);
      businessList.push(b);
    }
    return businessList;
  };

function createTagMapping (business) {
    var l = business.tags.length;
    var attributeScore;

    if (l == 0) return {};
    else if (l == 1) attributeScore = 1;
    else attributeScore = (Math.log(l))  /  (l-1);

    var tagMap = {};
    for (var i = 0; i < business.tags.length; i++){
        var tag = business.tags[i];
        tagMap[tag] = attributeScore;
    }
    return tagMap;
}

function generateProfile(userFavorites, tagScores){
    userTagScores = {};

    for (const [businessId, tagScoreObject] of Object.entries(tagScores)) {
        for (const [tag, tagScore] of Object.entries(tagScoreObject)) {
            userTagScores[tag] = 0;
        }
    }
    INITIALISED_TAG_LIST = userTagScores;

    for (var i = 0; i < userFavorites.length; i++){
        var businessId = userFavorites[i];
        for (const [tag, tagScore] of Object.entries(tagScores[businessId])) {
            userTagScores[tag] += tagScore;
        }
    }
    return userTagScores;

}
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

module.exports = {
    calculateAttributeScoreForAllObjects,
    calculateUserProfile,
    calculateIDF,
    multiplyAndSort,
    convertIdsToBusinesses,
};
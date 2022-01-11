controllerHelpers = require('./ControllerHelpers');


const getList = async (req, res) => {
  var userId = req.params.userId;
  

  var attributeScoreForAllObjects = await controllerHelpers.calculateAttributeScoreForAllObjects();
  var userProfile = await controllerHelpers.calculateUserProfile(userId, attributeScoreForAllObjects); // user to attribute
  var idfList = await controllerHelpers.calculateIDF(); // IDF to attribute
  var businessIdList = controllerHelpers.multiplyAndSort(attributeScoreForAllObjects, userProfile, idfList);


  var businessList = await controllerHelpers.convertIdsToBusinesses(businessIdList);
  
  res.json(businessList);
}

module.exports = {
  getList,
}


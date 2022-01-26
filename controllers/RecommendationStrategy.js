controllerHelpers = require('./ControllerHelpers');


class RecommendationStrategyManager {
    constructor(req, res) {
      this.req = req;
      this.res = res;
      this._strategy = null;
    }
  
    /**
     * @param {any} strategy
     */
    set strategy(strategy) {
      this._strategy = strategy;
    }
  
    get strategy() {
      return this._strategy;
    }
  
    async recommend() {
      await this._strategy.recommend(this.req, this.res);
    }
  }
  
  class FavoritesBasedStrategy{
    async recommend (req, res)  { 
      var userId = req.params.userId;
  
      var attributeScoreForAllObjects = await controllerHelpers.calculateAttributeScoreForAllObjects();
      var userProfile = await controllerHelpers.calculateUserProfile(userId, attributeScoreForAllObjects); // user to attribute
      var idfList = await controllerHelpers.calculateIDF(); // IDF to attribute
      var businessIdList = controllerHelpers.multiplyAndSort(attributeScoreForAllObjects, userProfile, idfList);
    
      var businessList = await controllerHelpers.convertIdsToBusinesses(businessIdList);
    
      res.json(businessList);
    }
  }

  module.exports = {
    RecommendationStrategyManager,
    FavoritesBasedStrategy
  };

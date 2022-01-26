var RecommendationStrategy = require('./RecommendationStrategy');
//  { RecommendationStrategyManager, FavoritesBasedStrategy } from './RecommendationStrategy';

controllerHelpers = require('./ControllerHelpers');
recommendationStrategy = require('./RecommendationStrategy');

const getList = async (req, res) => {

  const recommendationStrategyManager = new RecommendationStrategy.RecommendationStrategyManager(req, res);
  recommendationStrategyManager.strategy = new RecommendationStrategy.FavoritesBasedStrategy();
  recommendationStrategyManager.recommend();
};



module.exports = {
  getList,
};


import { RecommendationStrategyManager, FavoritesBasedStrategy } from './RecommendationStrategy';

controllerHelpers = require('./ControllerHelpers');
recommendationStrategy = require('./RecommendationStrategy');

const getList = async (req, res) => {

  const recommendationStrategyManager = new RecommendationStrategyManager(req, res);
  recommendationStrategyManager.strategy = new FavoritesBasedStrategy();
  recommendationStrategyManager.recommend();
};



export default {
  getList,
};


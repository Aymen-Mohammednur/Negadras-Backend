const express = require("express");
const router = express.Router();
const businessController = require("../controllers/businessController");
const recommendationController = require("../controllers/recommendationController");
const verifyToken = require("../middlewares/verifyToken");

// router.post('/', verifyToken, businessController.postBusiness);

router.get("/",verifyToken, businessController.getBusiness);


router.get("/favorites/:userId", verifyToken, businessController.getFavoriteBusiness);

router.get("/:id", verifyToken, businessController.getOneBusiness);

router.get(
  "/filter/:categoryId/:userId", verifyToken,
  businessController.getBusinessByCategory
);

router.get(
  "/filter/:categoryId/", verifyToken,
  businessController.searchBusiness
);

router.get(
  "/search/:categoryId/:userId", verifyToken,
  businessController.getBusinessByParam);

router.put("/:id", verifyToken, businessController.editBusiness);

router.post("/",verifyToken, businessController.postBusiness);

router.patch("/:id", verifyToken, businessController.addOrganizationToBusiness);

router.delete("/:id", verifyToken, businessController.deleteBusiness);

router.delete("/",verifyToken, businessController.deleteAllBusiness);

module.exports = router;
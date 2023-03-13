const express = require("express");

const brandController = require("../controllers/brand.controllers");

const router = express.Router();

router
  .route("/")
  .get(brandController.getBrands)
  .post(brandController.createBrand);
 

router
  .route("/:id")
  .get(brandController.getBrandById)
  .patch(brandController.updateBrandById);

module.exports = router;

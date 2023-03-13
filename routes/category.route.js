const express = require('express');
const router = express.Router();

const categoryController = require("../controllers/cetagory.controller");

router.route("/")
.get(categoryController.getCategory)
.post(categoryController.createCategroy)

module.exports = router;
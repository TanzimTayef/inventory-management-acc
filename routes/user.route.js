const express = require('express');
const userController = require("../controllers/user.controller");
const varifyToken = require('../middleware/varifyToken');

const router = express.Router();

router.post("/singup", userController.singup)
router.post("/login", userController.login)

router.get("/me", varifyToken, userController.getMe)

module.exports = router;
const express = require("express");
const { register, login, refresh } = require("../controllers/loginController");
const router =  express.Router();

router.post("/register/", register);
router.post("/login/", login);
router.post("/refresh/", refresh);

module.exports = {
    oAuthRouter: router
}
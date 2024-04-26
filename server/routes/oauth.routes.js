const express = require("express");
const { register, login, refresh } = require("../controllers/login.controller");
const router =  express.Router();

router.post("/register/", register);
router.post("/login/", login);
router.post("/refresh/", refresh);

module.exports = {
    oAuthRouter: router
}
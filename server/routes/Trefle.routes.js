const express = require('express');
const router = express.Router();
const nodeFetch = require('node-fetch'); 
const trefleController = require("../controllers/Trefle.controller.js");

router.get('/:query', trefleController.getPlantInfo);

module.exports = router;

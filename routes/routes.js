const express = require('express');
const router = express.Router();
const package = require('./package');

 // Package
router.use('/package',package);





module.exports = {
    routes: router
}
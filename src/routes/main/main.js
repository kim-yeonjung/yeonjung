const express = require("express");
const router = express.Router();

//const createError = require('http-errors');
//next(createError(404));

router.get("/", function (req, res) {
    res.render('basic_layout', {title: 'YeonJung Kim', page: 'index', active_index: 0});
});

router.get("/portfolio", function (req, res) {
    res.render('portfolio');
});

module.exports = router;
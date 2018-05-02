const express = require("express");
const router = express.Router();

//const createError = require('http-errors');
//next(createError(404));

router.get("/", function (req, res, next) {
    res.render('basic_layout', {title: 'YeonJung Kim', page: 'blank'});
});

router.get("/portfolio", function (req, res, next) {
    res.render('portfolio', {data: ""});
});

module.exports = router;
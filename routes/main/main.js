const express = require("express");
const router = express.Router();
const createError = require('http-errors');

//next(createError(404));

router.get("/", function (req, res, next) {
    res.render('index');
});

router.get("/portfolio", function (req, res, next) {
    res.render('index', {data: ""});
});

module.exports = router;
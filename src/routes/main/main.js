const express = require("express");
const router = express.Router();
const createError = require('http-errors');
const postData = require('./../../data/post_data');

//next(createError(404));

router.get("/", function (req, res, next) {
    res.render('index');
});

router.get("/portfolio", function (req, res, next) {
    res.render('portfolio', {data: ""});
});

router.get("/post/:post_id", function (req, res, next) {
    //req.params.post_id
    res.render('food_card');
});

router.get("/post_count", function (req, res, next) {
    return res.status(200).json({
        count: postData.getRecent()
    });
});

module.exports = router;
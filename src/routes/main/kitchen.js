const express = require("express");
const router = express.Router();
const postList = require('../../../resource/post_list.json');
const title = "YeonJung Kim - 쭝식당";

router.get("/", function (req, res, next) {
    res.render('basic_layout', {title: title, page: 'kitchen/food_list', data: postList});
});

router.post("/food_view", function (req, res, next) {
    res.render('kitchen/food_view', {
        title: title + " " + req.body.index + "차 오픈",
        data: postList[req.body.index]
    });
});

router.get("/recent_post", function (req, res, next) {
    return res.status(200).json(postList[postList.length - 1]);
});

module.exports = router;
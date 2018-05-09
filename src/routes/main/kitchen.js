const express = require("express");
const router = express.Router();
const postList = require('../../../resource/kitchen/kitchen_list.json');
const title = "YeonJung Kim - 쭝식당";

router.get("/", function (req, res) {
    res.render('basic_layout', {title: title, page: 'kitchen/food_list', data: postList});
});

router.get("/food_view", function (req, res) {
    let index = parseInt(req.param('index'));
    res.render('kitchen/food_view', {
        title: title + " " + (index + 1) + "차 오픈",
        index: index,
        data: postList[postList.length - (index+1)],
        recent_index: postList.length
    });
});

router.get("/recent_post", function (req, res) {
    return res.status(200).json(postList[postList.length - 1]);
});

module.exports = router;
const express = require("express");
const router = express.Router();
const postList = require('../../../resource/post_list.json');

router.get("/post/:post_index", function (req, res, next) {
    return res.status(200).json(postList[index]);
});

router.get("/recent_post", function (req, res, next) {
    return res.status(200).json(postList[postList.length - 1]);
});

module.exports = router;
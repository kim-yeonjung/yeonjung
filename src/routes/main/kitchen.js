const express = require("express");
const router = express.Router();
const postData = require('./../../data/post_data');

router.get("/post/:post_index", function (req, res, next) {
    postData.getPost(req.params.post_index, function (result) {
        return result;
    });
});

router.get("/recent_post", function (req, res, next) {
    postData.getRecentPost(req.params.post_index, function (result) {
        return result;
    });
});

module.exports = router;
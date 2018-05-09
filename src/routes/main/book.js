const express = require("express");
const router = express.Router();
const postList = require('../../../resource/book_list.json');

router.get("/", function (req, res) {
    res.render('basic_layout', {title: title, page: 'book/book_list', data: postList});
});

module.exports = router;
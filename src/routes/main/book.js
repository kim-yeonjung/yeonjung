const express = require("express");
const router = express.Router();
const itBookList = require('../../../resource/book/book_list_it.json');
const elseBookList = require('../../../resource/book/book_list_else.json');

const title = "YeonJung Kim - 읽은 도서";

router.get("/", function (req, res) {
    res.render('basic_layout', {
        title: title,
        page: 'book/book_list',
        data: req.param('category').includes("it") ? itBookList : elseBookList, active_index: 0
    });
});

module.exports = router;
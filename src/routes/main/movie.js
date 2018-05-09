const express = require("express");
const router = express.Router();
const movieList = require('../../../resource/movie/movie_list.json');

const title = "YeonJung Kim - 영화";

router.get("/", function (req, res) {
    res.render('basic_layout', {title: title, page: 'movie/movie_list', data: movieList, active_index: 4});
});

module.exports = router;
const dbManager = require("../../data/db/database_manager");
const express = require("express");
const router = express.Router();
const createError = require('http-errors');

router.get("/", function (req, res, next) {
    dbManager.getData('blog', 'all', 20, function (result, error) {
        if (error) {
            next(createError(404));
        } else {
            res.render('index', {data: result});
        }
    });
});

module.exports = router;
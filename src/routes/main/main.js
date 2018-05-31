const Express = require('express');
const Router = Express.Router();

Router.get("/", function (req, res) {
    res.render('basic_layout', {title: 'YeonJung Kim', page: 'index', active_index: 0});
});

Router.get("/portfolio", function (req, res) {
    res.render('portfolio');
});

module.exports = Router;
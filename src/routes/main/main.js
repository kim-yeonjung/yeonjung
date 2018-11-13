const Express = require('express');
const Router = Express.Router();

Router.get("/old_v1", function (req, res) {
    res.render('portfolio_v1', {
        data: require('../../data/portfolio').getData()
    });
});

Router.get("/", function (req, res) {
    res.render('portfolio_v2', {
        data: require('../../data/portfolio').getData()
    });
});

module.exports = Router;
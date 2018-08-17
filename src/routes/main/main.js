const Express = require('express');
const Router = Express.Router();

Router.get("/", function (req, res) {
    res.render('portfolio', {
        data: require('../../data/portfolio').getData()
    });
});

module.exports = Router;
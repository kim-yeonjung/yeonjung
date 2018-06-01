const Express = require('express');
const Router = Express.Router();
const Rp = require('request-promise');
const Cheerio = require('cheerio');

Router.get("/", function (req, res) {
    let options = {
        uri: 'https://github.com/users/duswnd25/contributions',
        transform: function (body) {
            return Cheerio.load(body);
        }
    };

    Rp(options).then(function ($) {
        res.render('basic_layout', {
            title: 'YeonJung Kim',
            page: 'index',
            active_index: 0,
            github_contribution: $('svg').eq(0)
        });
    }).catch(function (err) {
    });
});

Router.get("/portfolio", function (req, res) {
    res.render('portfolio');
});

module.exports = Router;
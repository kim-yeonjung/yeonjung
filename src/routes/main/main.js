const Express = require('express');
const Router = Express.Router();
const Rp = require('request-promise');
const Cheerio = require('cheerio');
const puppeteer = require('puppeteer');

Router.get("/", function (req, res) {
    puppeteer.launch()
        .then((browser) => {
            return browser.newPage()
                .then((page) => {
                    return page.goto('https://github.com/')
                        .then(() => page.screenshot({path: 'github.png'}))
                })
                .then(() => browser.close());
        });
    let options = {
        uri: 'https://github.com/duswnd25/',
        transform: function (body) {
            return Cheerio.load(body);
        }
    };

    Rp(options).then(function ($) {
        res.render('basic_layout', {
            title: 'YeonJung Kim',
            page: 'index',
            active_index: 0,
            github_contribution: $('div.mb-5.border.border-gray-dark.rounded-1.py-2').eq(0)
        });
    }).catch(function (err) {
    });
});

Router.get("/portfolio", function (req, res) {
    res.render('portfolio', {
        data: require('./../../../resource/portfolio/portfolio').getData()
    });
});

module.exports = Router;
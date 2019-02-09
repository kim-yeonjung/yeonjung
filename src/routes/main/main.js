const express = require('express');
const router = express.Router();

//rter.use('/',appRoot + '/googlee98418e615463718.html');

router.get("/old_v1", function (req, res) {
    res.render('portfolio_v1', {
        data: require('../../data/portfolio').getData()
    });
});

router.get("/", function (req, res) {
    res.render('portfolio_v2', {
        data: require('../../data/portfolio').getData()
    });
});

module.exports = router;

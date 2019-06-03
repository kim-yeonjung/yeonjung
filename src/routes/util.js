const express = require('express');

const router = express.Router();

router.get('/timer', (req, res) => {
	res.render('timer');
});

module.exports = router;

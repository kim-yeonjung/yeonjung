const express = require('express');

const router = express.Router();
const postList = require('../../../resource/kitchen/kitchen_list.json');

const title = 'YeonJung Kim - 쭝식당';

router.get('/', function(req, res) {
	res.render('basic_layout', {
		title,
		page: 'kitchen/list',
		data: postList,
		active_index: 3
	});
});

router.get('/detail', function(req, res) {
	const index = parseInt(req.param('index'));
	res.render('basic_layout', {
		title: `${title} ${index + 1}차 오픈`,
		index,
		data: postList[postList.length - (index + 1)],
		recent_index: postList.length,
		page: 'kitchen/detail',
		active_index: 3
	});
});

module.exports = router;

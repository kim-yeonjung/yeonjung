const postList = require('../../resource/post_list.json');

exports.getRecent = function () {
    return postList.length;
};

exports.getPost = function (index, callback) {
    callback(postList[index]);
};

exports.getRecentPost = function (index, callback) {
    callback(postList[postList.length - 1]);
};
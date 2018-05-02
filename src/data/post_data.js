const postList = require('../../resource/post_list.json');

exports.getRecent = function () {
    return postList.length;
};

exports.getPost = function (index) {
    return postList[parseInt(index)];
};
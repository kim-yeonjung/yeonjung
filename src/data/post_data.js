const postList = require('../../resource/post_list.json');
const cheerio = require('cheerio');
const requestPromise = require('request-promise');

exports.getRecent = function () {
    return postList.length;
};

exports.getPost = function (index, callback) {

    let options = {
        uri: postList[index].url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    requestPromise(options)
        .then(function ($) {
            let posts = $('div.card_default.card_image');
            let result = [];

            posts.forEach(function (item) {
                let imgSrc = item.child('img').eq(0).attr('src');
                let text = item.child('strong.tit_card').eq(0).text();
                result.push({text: text, img_src: imgSrc});
            });
            callback(result, null);
        })
        .catch(function (err) {
            return callback(null, err);
        });
};
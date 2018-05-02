const Parse = require("parse/node");

// Server init
Parse.initialize(process.env.APP_ID);
Parse.serverURL = process.env.SERVER_URL;

// 새 데이터 여부
exports.isNewData = function (post_title, callback) {
    let Post = Parse.Object.extend("Post");
    let query = new Parse.Query(Post);
    query.equalTo("post_title", post_title);
    query.count({
        success: function (count) {
            console.log("DB : NEW POST = " + (count === 0 ? "TRUE" : "FALSE").toString());
            callback(count === 0, null);
        },
        error: function (error) {
            console.error("DB : POST COUNT ERROR = " + error.code);
            console.error(error.message);
            callback(null, error);
        }
    });
};

// 업데이트
exports.updateData = function (data) {
    let Post = Parse.Object.extend("Post");
    let query = new Parse.Query(Post);
    query.equalTo("blog_url", data.blog_url);
    query.first({
        success: function (result) {
            result.set("blog_name", data.blog_name);
            result.set("post_title", data.post_title);
            result.set("post_url", data.post_url);
            result.set("post_content", data.post_content);
            result.set("profile_url", data.profile_url);
            result.save();
            console.log("DB : UPDATE SUCCESS");
        },
        error: function (error) {
            console.error("DB : UPDATE ERROR = " + error.code);
            console.error(error.message);
        }
    });
};

exports.getData = function (target_column, user_query, limit, callback) {
    let Post = Parse.Object.extend("Post");
    let query = new Parse.Query(Post);
    query.limit(limit);
    query.descending("updatedAt");
    if (user_query !== "all") {
        query.equalTo(target_column, user_query);
    }

    query.find({
        success: function (results) {
            let temp = [];
            results.forEach(function (item) {
                let tempJson = {
                    "profile_url": "",
                    "blog_name": item.get("blog_name"),
                    "blog_url": item.get("blog_url"),
                    "feed_url": item.get("feed_url"),
                    "post_title": item.get("post_title"),
                    "post_url": item.get("post_url"),
                    "post_content": item.get("post_content"),
                    "update_at": new Date(item.updatedAt).getCustomType()
                };

                if (item.get("profile_url") === undefined || item.get("profile_url") === "") {
                    tempJson.profile_url = "https://www.google.com/s2/favicons?domain=" + item.get("blog_url");
                } else {
                    tempJson.profile_url = item.get("profile_url");
                }

                temp.push(tempJson);
            });
            callback(temp, null);
        },
        error: function (error) {
            console.error("DB : FETCH DATA ERROR = " + error.code);
            console.error(error.message);
            callback(null, error);
        }
    });
};

exports.getParsingList = function (callback) {
    let Post = Parse.Object.extend("Post");
    let query = new Parse.Query(Post);
    query.find({
        success: function (results) {
            let temp = [];
            results.forEach(function (item) {
                console.log("DB : FETCH FEED LIST SUCCESS = " + item.get("blog_name"));
                temp.push({
                    "feed_url": item.get("feed_url"),
                    "blog_url": item.get("blog_url")
                });
            });
            callback(temp, null);
        },
        error: function (error) {
            console.error("DB : FETCH FEED LIST ERROR = " + error.code);
            console.error(error.message);
            callback(null, error);
        }
    });
};

Date.prototype.getCustomType = function () {
    let year = this.getFullYear().toString();
    let month = (this.getMonth() + 1).toString();
    let date = this.getDate().toString();
    let hour = (this.getHours() + 9).toString();
    let minute = this.getMinutes().toString();
    // 서버에는 UTC +0 으로 저장되어 있다. 한국은 UTC +9 이다
    return year + "년 " + month + "월 " + date + "일 " + hour + "시 " + minute + "분";
};
const DBManager = require("./../db/database_manager");
const FeedParser = require("feedparser");
const Request = require("request");
const Cheerio = require('cheerio');
const Fcm = require("./../../service/fcm/fcm_send");

DBManager.getData("blog", "all", 1000, function (results, error) {
    if (error !== null) {
        console.error("DB : GET BLOG LIST ERROR = " + error.code);
        console.error(error.message);
    } else {
        console.log("DB : GET BLOG LIST SUCCESS");
        results.forEach(function (item) {
            parseFeed(item);
        });
    }
});

function parseFeed(item) {
    let request = Request(item.feed_url);
    let feedParser = new FeedParser({});

    request.on("error", function (error) {
        console.error("FEED PARSER ERROR : REQUEST ERROR ");
        console.error(error.message);
    });

    request.on("response", function (res) {
        let stream = this;
        if (res.statusCode !== 200) {
            this.emit("error", new Error("Bad status code"));
        }
        else {
            stream.pipe(feedParser);
        }
    });

    feedParser.on("error", function (error) {
        console.error("FEED PARSER ERROR : " + error.code);
        console.error(error.message);
    });

    feedParser.once("readable", function () {
        let stream = this;
        let metaData = this.meta;
        let feedData = stream.read();

        // 내용에서 태그를 정리한다.
        let postContent = feedData.summary || feedData.description;
        postContent.replace(/<br\/>/ig, "\n");
        postContent = postContent.replace(/(<([^>]+)>)/ig, "");

        // 글 링크
        let postLink = (feedData.link === undefined ? item.blog_url : feedData.link).toString();
        if (!postLink.includes("http")) {
            postLink = item.blog_url + postLink;
        }

        item.blog_name = metaData.title;
        item.post_title = feedData.title;
        item.post_url = postLink;
        item.post_content = postContent;

        DBManager.isNewData(feedData.title, function (isNewData, error) {
            if (isNewData === true && error === null) {
                Request(item.post_url, function (error, response, html) {
                    if (error) {
                        console.error("FEED PARSER ERROR : " + error.message);
                    }
                    try {
                        let $ = Cheerio.load(html);

                        item.profile_url = $('meta[property="og:image"]').attr('content');
                    }catch (e){
                        console.error("FEED PARSER ERROR : " + e.message);
                    }

                    DBManager.updateData(item);
                    Fcm.sendFCM("QUICK", item.post_title, item.post_content);
                });
            }
        });
    });
}
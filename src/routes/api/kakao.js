const express = require("express");
const router = express.Router();
const postList = require('../../../resource/post_list.json');

// 최초 접근
router.get("/keyboard", (req, res) => {
    return res.status(200).json({
        "type": "buttons",
        "buttons": [
            "최근 오픈 기록",
            "모든 오픈 기록",
            "홈페이지",
            "계좌번호"
        ]
    });
});

// 친구 추가/제거
router.get("/friend", (req, res) => {
    return res.status(200);
});

// 채팅방 나가기
router.get("/chat_room/:user_key", (req, res) => {
    return res.status(200);
});

// 메시지
router.get("/message", (req, res) => {
    let type = req.param('type');
    let content = req.param('content');
    let response = {};

    switch (content) {
        case "최근 오픈 기록":
            response.message.text = "최근 오픈 입니다.";
            response.message.message_button = {
                "label": postList[0].index + "번째 오픈",
                "url": postList[0].url
            };
            break;
        case "모든 오픈 기록":
            response.message.text = "준비중 입니다.";
            break;
        case "홈페이지":
            response.message.text = "https://yeonjung.herokuapp.com/kitchen/";
            break;
        case "계좌번호":
            response.message.text = "카카오뱅크 3333-04-3410553 김연중";
            break;
        default:
            response.message.text = "잘못된 요청 입니다.";
    }
    return res.status(200).json(response);
});

module.exports = router;
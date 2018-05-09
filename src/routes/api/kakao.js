const express = require("express");
const router = express.Router();
const postList = require('../../../resource/kitchen/kitchen_list.json');
const responseGenerator = require('./../../service/kakao/response_generator');

// 최초 접근
router.get("/keyboard", (req, res) => {
    return res.status(200).json({
        "type": "buttons",
        "buttons": responseGenerator.rootMenu
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
router.post("/message", (req, res) => {
    res.set({
        'content-type': 'application/json',
        encoding: 'UTF-8'
    });

    let type = req.body.type;
    let content = req.body.content;
    let response;

    switch (content) {
        case "최근 오픈 기록":
            response = responseGenerator.photoType(postList[0].description, postList[0].post[0].img_src, (postList[0].index + 1) + '차 오픈', postList[0].url);
            break;
        case "홈페이지":
            response = responseGenerator.buttonType('쭝식당 홈페이지 입니다.', '바로가기', 'https://yeonjung.herokuapp.com/kitchen/');
            break;
        case "계좌번호":
            response = responseGenerator.textType('카카오뱅크 3333-04-3410553 김연중');
            break;
        case "모든 오픈 기록":
            let openList = [];
            for (let index = 0; index < postList.length; index++) {
                openList.push((postList.length - index) + ' 차 오픈 ' + postList[index].description);
            }
            response = responseGenerator.textWithSubMenuType('모든 오픈 내역 입니다.', openList);
            break;
        default:
            if (content.includes('차 오픈')) {
                let index = postList.length - parseInt(content.split(" ")[0]);
                response = responseGenerator.photoType(postList[index].description, postList[index].post[0].img_src, (postList[index].index + 1) + '차 오픈', postList[index].url);
            } else {
                response = responseGenerator.textType('잘못된 요청 입니다.');
            }
    }
    return res.status(200).json(response);
});

module.exports = router;